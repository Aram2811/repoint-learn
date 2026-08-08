import { Module } from '@nestjs/common';
import { LessonController, SectionController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  controllers: [SectionController, LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
