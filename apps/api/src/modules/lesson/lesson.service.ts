import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateSectionDto, UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── SECTION ───────────────────────────────────

  async createSection(dto: CreateSectionDto) {
    // چک کن course وجود داره
    const course = await this.prisma.course.findUnique({
      where: { id: dto.courseId },
    });
    if (!course) throw new NotFoundException('دوره یافت نشد');

    return this.prisma.section.create({ data: dto });
  }

  async updateSection(id: string, dto: UpdateSectionDto) {
    const section = await this.prisma.section.findUnique({ where: { id } });
    if (!section) throw new NotFoundException('فصل یافت نشد');

    return this.prisma.section.update({ where: { id }, data: dto });
  }

  async removeSection(id: string) {
    const section = await this.prisma.section.findUnique({ where: { id } });
    if (!section) throw new NotFoundException('فصل یافت نشد');

    // Cascade: درس‌های داخل فصل هم حذف می‌شن (تعریف شده در schema)
    return this.prisma.section.delete({ where: { id } });
  }

  // ─── LESSON ────────────────────────────────────

  async createLesson(dto: CreateLessonDto) {
    const section = await this.prisma.section.findUnique({
      where: { id: dto.sectionId },
    });
    if (!section) throw new NotFoundException('فصل یافت نشد');

    return this.prisma.lesson.create({ data: dto });
  }

  async findLesson(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        section: {
          include: {
            course: { select: { id: true, title: true, slug: true } },
          },
        },
      },
    });

    if (!lesson) throw new NotFoundException('درس یافت نشد');
    return lesson;
  }

  async updateLesson(id: string, dto: UpdateLessonDto) {
    await this.findLesson(id);
    return this.prisma.lesson.update({ where: { id }, data: dto });
  }

  async removeLesson(id: string) {
    await this.findLesson(id);
    return this.prisma.lesson.delete({ where: { id } });
  }

  // ثبت یا آپدیت پیشرفت تماشا (برای "ادامه تماشا")
  async updateWatchProgress(
    userId: string,
    lessonId: string,
    progressSeconds: number,
  ) {
    await this.findLesson(lessonId);

    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    const isCompleted =
      lesson?.duration && progressSeconds >= lesson.duration * 0.9;
    // اگه ۹۰٪ ویدیو دیده شد = کامل شده

    return this.prisma.watchHistory.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {
        progressSeconds,
        ...(isCompleted ? { completedAt: new Date() } : {}),
      },
      create: { userId, lessonId, progressSeconds },
    });
  }

  // بوکمارک
  async toggleBookmark(userId: string, lessonId: string) {
    await this.findLesson(lessonId);

    const existing = await this.prisma.bookmark.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });

    if (existing) {
      await this.prisma.bookmark.delete({
        where: { userId_lessonId: { userId, lessonId } },
      });
      return { bookmarked: false };
    }

    await this.prisma.bookmark.create({ data: { userId, lessonId } });
    return { bookmarked: true };
  }
}
