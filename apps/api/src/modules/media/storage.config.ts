// این فایل تنظیمات آپلود فایل رو مشخص می‌کنه.
//
// Multer: یه middleware هست که فایل‌های multipart/form-data رو
// parse می‌کنه. NestJS بهش پشتیبانی داره.
//
// ما فایل رو اول در پوشه‌ی temp ذخیره می‌کنیم،
// بعد FFmpeg پردازشش می‌کنه و فایل‌های HLS می‌سازه.

import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';

// پوشه‌ی اصلی برای ذخیره‌ی فایل‌های media
export const UPLOADS_DIR = join(process.cwd(), 'uploads');
export const TEMP_DIR = join(UPLOADS_DIR, 'temp');
export const HLS_DIR = join(UPLOADS_DIR, 'hls');

// فرمت‌های ویدیویی مجاز
const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo', // avi
  'video/x-matroska', // mkv
];

// حداکثر حجم: 2GB
export const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024;

export const videoMulterConfig = {
  storage: diskStorage({
    destination: TEMP_DIR,
    filename: (_req, _file, cb) => {
      // اسم فایل رو با uuid تصادفی می‌کنیم تا تداخل نداشته باشه
      const uniqueName = `${uuidv4()}${extname(_file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: MAX_VIDEO_SIZE },
  fileFilter: (
    _req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
      cb(
        new BadRequestException(
          'فرمت فایل پشتیبانی نمی‌شود. فرمت‌های مجاز: MP4, WebM, MOV, AVI, MKV',
        ),
        false,
      );
      return;
    }
    cb(null, true);
  },
};
