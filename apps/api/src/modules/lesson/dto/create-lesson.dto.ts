import {
  IsString, IsOptional, IsBoolean,
  IsInt, IsIn, MinLength, MaxLength, IsUrl,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  title: string;

  @IsString()
  sectionId: string;

  @IsOptional()
  @IsString()
  description?: string;

  // لینک ویدیو از YouTube, Aparat, Vimeo یا هر پلتفرم دیگه
  @IsOptional()
  @IsUrl({}, { message: 'آدرس ویدیو باید یک URL معتبر باشد' })
  videoUrl?: string;

  @IsOptional()
  @IsIn(['youtube', 'aparat', 'vimeo', 'direct'])
  videoType?: string;

  // thumbnail — لینک یا key فایل آپلودشده
  @IsOptional()
  @IsString()
  thumbnailKey?: string; // کلید فایل آپلودشده در storage

  @IsOptional()
  @IsUrl({}, { message: 'آدرس تصویر باید یک URL معتبر باشد' })
  thumbnailUrl?: string; // لینک تصویر خارجی

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @IsString()
  metaTitle?: string;
}
