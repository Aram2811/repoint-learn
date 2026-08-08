import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FfmpegService } from './ffmpeg.service';
import { TEMP_DIR, HLS_DIR } from './storage.config';
import { join } from 'path';
import { unlink, mkdir } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly ffmpeg: FfmpegService,
  ) {}

  // آپلود و پردازش ویدیو
  async uploadVideo(
    file: Express.Multer.File,
    uploadedById: string,
  ): Promise<{
    mediaId: string;
    videoKey: string;
    duration: number;
    qualities: string[];
  }> {
    // اطمینان از وجود پوشه‌های لازم
    await mkdir(TEMP_DIR, { recursive: true });
    await mkdir(HLS_DIR, { recursive: true });

    const videoId = uuidv4();
    const inputPath = file.path;

    this.logger.log(`شروع پردازش ویدیو: ${videoId}`);

    // گرفتن اطلاعات ویدیوی اصلی
    const { duration, width, height } =
      await this.ffmpeg.getVideoInfo(inputPath);

    this.logger.log(`اطلاعات ویدیو: ${width}x${height}, ${duration}s`);

    // تبدیل به HLS
    const result = await this.ffmpeg.convertToHls(inputPath, videoId, height);

    // ذخیره در دیتابیس
    const media = await this.prisma.media.create({
      data: {
        key: `hls/${videoId}/master.m3u8`,  // مسیر نسبی
        bucket: 'local',
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        width,
        height,
        uploadedById,
      },
    });

    // حذف فایل موقت اصلی (فایل HLS ساخته شده، اصلی رو نگه نمی‌داریم)
    try {
      await unlink(inputPath);
      this.logger.log(`فایل موقت حذف شد: ${inputPath}`);
    } catch {
      this.logger.warn(`نتوانستیم فایل موقت را حذف کنیم: ${inputPath}`);
    }

    return {
      mediaId: media.id,
      videoKey: media.key,
      duration,
      qualities: result.qualities,
    };
  }

  // آپلود تصویر (thumbnail)
  async uploadImage(
    file: Express.Multer.File,
    uploadedById: string,
  ): Promise<{ mediaId: string; imageKey: string }> {
    const ext = file.originalname.split('.').pop();
    const imageKey = `images/${uuidv4()}.${ext}`;
    const destDir = join(process.cwd(), 'uploads', 'images');

    await mkdir(destDir, { recursive: true });

    const { rename } = await import('fs/promises');
    await rename(file.path, join(process.cwd(), 'uploads', imageKey));

    const media = await this.prisma.media.create({
      data: {
        key: imageKey,
        bucket: 'local',
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        uploadedById,
      },
    });

    return { mediaId: media.id, imageKey };
  }

  // لیست media های آپلودشده (برای ادمین)
  async findAll() {
    return this.prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async findOne(id: string) {
    const media = await this.prisma.media.findUnique({ where: { id } });
    if (!media) throw new NotFoundException('فایل یافت نشد');
    return media;
  }

  async remove(id: string) {
    const media = await this.findOne(id);
    // حذف فایل‌های فیزیکی
    // (در production این کار رو با R2 API انجام می‌دیم)
    return this.prisma.media.delete({ where: { id: media.id } });
  }
}
