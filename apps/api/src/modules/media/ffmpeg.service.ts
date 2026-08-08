

import { Injectable, Logger } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';
import type { FfprobeData } from 'fluent-ffmpeg';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { HLS_DIR } from './storage.config';

export interface HlsResult {
  videoId: string;
  masterPlaylist: string; // مسیر master.m3u8
  duration: number;       // طول ویدیو به ثانیه
  qualities: string[];    // کیفیت‌های تولیدشده
}

// تعریف کیفیت‌های مختلف
const QUALITIES = [
  {
    name: '360p',
    width: 640,
    height: 360,
    videoBitrate: '800k',
    audioBitrate: '96k',
  },
  {
    name: '720p',
    width: 1280,
    height: 720,
    videoBitrate: '2500k',
    audioBitrate: '128k',
  },
  {
    name: '1080p',
    width: 1920,
    height: 1080,
    videoBitrate: '5000k',
    audioBitrate: '192k',
  },
];

@Injectable()
export class FfmpegService {
  private readonly logger = new Logger(FfmpegService.name);

  // گرفتن اطلاعات ویدیو (طول، کیفیت اصلی)
  getVideoInfo(inputPath: string): Promise<{ duration: number; width: number; height: number }> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputPath, (err, metadata) => {
        if (err) return reject(err);

        const videoStream = metadata.streams.find(
          (s) => s.codec_type === 'video',
        );

        resolve({
          duration: Math.round(metadata.format.duration ?? 0),
          width: videoStream?.width ?? 0,
          height: videoStream?.height ?? 0,
        });
      });
    });
  }

  // تبدیل یه کیفیت مشخص به HLS
  private convertQuality(
    inputPath: string,
    outputDir: string,
    quality: (typeof QUALITIES)[0],
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          `-vf scale=${quality.width}:${quality.height}`,
          `-b:v ${quality.videoBitrate}`,
          `-b:a ${quality.audioBitrate}`,
          '-c:v libx264',
          '-c:a aac',
          '-hls_time 10',          // هر segment = 10 ثانیه
          '-hls_list_size 0',      // همه‌ی segmentها در playlist
          '-hls_segment_filename',
          join(outputDir, 'seg%03d.ts'), // نام فایل‌های segment
          '-f hls',
        ])
        .output(join(outputDir, 'index.m3u8'))
        .on('start', (cmd) => {
          this.logger.log(`FFmpeg شروع کرد [${quality.name}]: ${cmd}`);
        })
        .on('progress', (progress) => {
          this.logger.log(
            `پیشرفت [${quality.name}]: ${Math.round(progress.percent ?? 0)}%`,
          );
        })
        .on('end', () => {
          this.logger.log(`تکمیل شد [${quality.name}]`);
          resolve();
        })
        .on('error', (err) => {
          this.logger.error(`خطا [${quality.name}]: ${err.message}`);
          reject(err);
        })
        .run();
    });
  }

  // ساخت master playlist که همه‌ی کیفیت‌ها رو معرفی می‌کنه
  private buildMasterPlaylist(
    qualities: (typeof QUALITIES)[number][],
  ): string {
    let content = '#EXTM3U\n#EXT-X-VERSION:3\n\n';

    for (const q of qualities) {
      const bandwidth =
        parseInt(q.videoBitrate) * 1000 + parseInt(q.audioBitrate) * 1000;
      content += `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${q.width}x${q.height},NAME="${q.name}"\n`;
      content += `${q.name}/index.m3u8\n\n`;
    }

    return content;
  }

  // تابع اصلی: تبدیل کامل ویدیو به HLS
  async convertToHls(
    inputPath: string,
    videoId: string,
    originalHeight: number,
  ): Promise<HlsResult> {
    const outputDir = join(HLS_DIR, videoId);

    // فقط کیفیت‌هایی بساز که از کیفیت اصلی بالاتر نباشن
    // (اگه ویدیو 720p باشه، 1080p نمی‌سازیم)
    const qualitiesToGenerate = QUALITIES.filter(
      (q) => q.height <= originalHeight,
    );

    // اگه ویدیو از ۳۶۰p هم کوچیک‌تره، فقط ۳۶۰p بساز
    if (qualitiesToGenerate.length === 0) {
      qualitiesToGenerate.push(QUALITIES[0]);
    }

    // ساخت پوشه‌های output
    await mkdir(outputDir, { recursive: true });
    for (const q of qualitiesToGenerate) {
      await mkdir(join(outputDir, q.name), { recursive: true });
    }

    // تبدیل همه‌ی کیفیت‌ها (به صورت موازی)
    await Promise.all(
      qualitiesToGenerate.map((q) =>
        this.convertQuality(inputPath, join(outputDir, q.name), q),
      ),
    );

    // ساخت master playlist
    const { writeFile } = await import('fs/promises');
    const masterContent = this.buildMasterPlaylist(qualitiesToGenerate);
    await writeFile(join(outputDir, 'master.m3u8'), masterContent);

    const { duration } = await this.getVideoInfo(inputPath);

    return {
      videoId,
      masterPlaylist: join(outputDir, 'master.m3u8'),
      duration,
      qualities: qualitiesToGenerate.map((q) => q.name),
    };
  }
}
