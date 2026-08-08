import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateSectionDto, UpdateLessonDto } from './dto/update-lesson.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles, RolesGuard } from '../../common/guards/roles.guard';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { User } from '@repoint/database';

// ─── SECTIONS ─────────────────────────────────────────
@Controller('sections')
export class SectionController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Post()
  createSection(@Body() dto: CreateSectionDto) {
    return this.lessonService.createSection(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Patch(':id')
  updateSection(@Param('id') id: string, @Body() dto: UpdateSectionDto) {
    return this.lessonService.updateSection(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeSection(@Param('id') id: string) {
    return this.lessonService.removeSection(id);
  }
}

// ─── LESSONS ──────────────────────────────────────────
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Public()
  @Get(':id')
  findLesson(@Param('id') id: string) {
    return this.lessonService.findLesson(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Post()
  createLesson(@Body() dto: CreateLessonDto) {
    return this.lessonService.createLesson(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Patch(':id')
  updateLesson(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.lessonService.updateLesson(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeLesson(@Param('id') id: string) {
    return this.lessonService.removeLesson(id);
  }

  // ثبت پیشرفت تماشا — فقط کاربر لاگین‌شده
  @UseGuards(JwtAuthGuard)
  @Post(':id/progress')
  updateProgress(
    @Param('id') lessonId: string,
    @Body('progressSeconds') progressSeconds: number,
    @CurrentUser() user: User,
  ) {
    return this.lessonService.updateWatchProgress(user.id, lessonId, progressSeconds);
  }

  // بوکمارک — فقط کاربر لاگین‌شده
  @UseGuards(JwtAuthGuard)
  @Post(':id/bookmark')
  toggleBookmark(
    @Param('id') lessonId: string,
    @CurrentUser() user: User,
  ) {
    return this.lessonService.toggleBookmark(user.id, lessonId);
  }
}
