import {
  Controller, Post, Get, Delete, Param,
  UseInterceptors, UploadedFile, UseGuards,
  HttpCode, HttpStatus, Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { join } from 'path';
import { createReadStream, statSync, existsSync } from 'fs';
import { MediaService } from './media.service';
import { videoMulterConfig, HLS_DIR } from './storage.config';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles, RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';
import type { User } from '@repoint/database';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // آپلود ویدیو — فقط ادمین
  // پردازش ممکنه چند دقیقه طول بکشه (FFmpeg)
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Post('upload/video')
  @UseInterceptors(FileInterceptor('file', videoMulterConfig))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    return this.mediaService.uploadVideo(file, user.id);
  }

  // آپلود تصویر (thumbnail) — فقط ادمین
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    return this.mediaService.uploadImage(file, user.id);
  }

  // لیست media — فقط ادمین
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  // حذف media — فقط super_admin
  @UseGuards(RolesGuard)
  @Roles('super_admin')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }

  // ─── HLS STREAMING ──────────────────────────────────────
  //
  // این endpoint ها فایل‌های HLS رو serve می‌کنن.
  // در production، این کار رو Nginx یا CDN انجام می‌ده.
  // اما در توسعه، NestJS خودش این فایل‌ها رو serve می‌کنه.
  //
  // چرا @Public()؟
  // چون پلیر ویدیو (Video.js) این فایل‌ها رو مستقیماً fetch می‌کنه
  // و نمی‌تونه Cookie رو ارسال کنه. در production می‌شه
  // با signed URL امنیتش رو بیشتر کرد.

  // master.m3u8 — فایل اصلی playlist
  @Public()
  @Get('stream/:videoId/master.m3u8')
  streamMaster(
    @Param('videoId') videoId: string,
    @Res() res: Response,
  ) {
    const filePath = join(HLS_DIR, videoId, 'master.m3u8');

    if (!existsSync(filePath)) {
      res.status(404).json({ message: 'ویدیو یافت نشد' });
      return;
    }

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Access-Control-Allow-Origin', '*');
    createReadStream(filePath).pipe(res);
  }

  // playlist کیفیت خاص — مثلاً 720p/index.m3u8
  @Public()
  @Get('stream/:videoId/:quality/index.m3u8')
  streamQualityPlaylist(
    @Param('videoId') videoId: string,
    @Param('quality') quality: string,
    @Res() res: Response,
  ) {
    const filePath = join(HLS_DIR, videoId, quality, 'index.m3u8');

    if (!existsSync(filePath)) {
      res.status(404).json({ message: 'کیفیت یافت نشد' });
      return;
    }

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.setHeader('Access-Control-Allow-Origin', '*');
    createReadStream(filePath).pipe(res);
  }

  // فایل‌های segment — مثلاً 720p/seg000.ts
  @Public()
  @Get('stream/:videoId/:quality/:segment')
  streamSegment(
    @Param('videoId') videoId: string,
    @Param('quality') quality: string,
    @Param('segment') segment: string,
    @Res() res: Response,
  ) {
    // فقط فایل‌های .ts مجازند
    if (!segment.endsWith('.ts')) {
      res.status(400).json({ message: 'فرمت نامعتبر' });
      return;
    }

    const filePath = join(HLS_DIR, videoId, quality, segment);

    if (!existsSync(filePath)) {
      res.status(404).json({ message: 'segment یافت نشد' });
      return;
    }

    const stat = statSync(filePath);
    res.setHeader('Content-Type', 'video/MP2T');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Access-Control-Allow-Origin', '*');
    createReadStream(filePath).pipe(res);
  }
}
