import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { FfmpegService } from './ffmpeg.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, FfmpegService],
  exports: [MediaService],
})
export class MediaModule {}
