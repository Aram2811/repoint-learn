-- این migration فیلد video_url رو به جدول lessons اضافه می‌کنه
-- به جای آپلود مستقیم ویدیو، لینک YouTube/Aparat/هر پلتفرمی ذخیره می‌شه

ALTER TABLE "lessons" ADD COLUMN IF NOT EXISTS "video_url" TEXT;
ALTER TABLE "lessons" ADD COLUMN IF NOT EXISTS "video_type" TEXT DEFAULT 'youtube';
-- video_type: youtube | aparat | vimeo | direct

-- thumbnail_url برای لینک تصویر (به جای آپلود مستقیم)
ALTER TABLE "lessons" ADD COLUMN IF NOT EXISTS "thumbnail_url" TEXT;
