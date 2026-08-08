import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  // لیست دوره‌های منتشرشده برای صفحه‌ی عمومی
  async findAllPublished() {
    return this.prisma.course.findMany({
      where: { isPublished: true },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        _count: { select: { sections: true } },
      },
      orderBy: { order: 'asc' },
    });
  }

  // لیست همه‌ی دوره‌ها برای ادمین (شامل unpublished)
  async findAll() {
    return this.prisma.course.findMany({
      include: {
        category: { select: { id: true, name: true } },
        _count: { select: { sections: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // جزئیات کامل دوره با فصل‌ها و درس‌ها
  async findBySlug(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: {
        category: true,
        sections: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                duration: true,
                isFree: true,
                isPublished: true,
                order: true,
              },
            },
          },
        },
      },
    });

    if (!course) throw new NotFoundException('دوره یافت نشد');
    return course;
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        category: true,
        sections: {
          orderBy: { order: 'asc' },
          include: { lessons: { orderBy: { order: 'asc' } } },
        },
      },
    });

    if (!course) throw new NotFoundException('دوره یافت نشد');
    return course;
  }

  async create(dto: CreateCourseDto) {
    const existing = await this.prisma.course.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) throw new ConflictException('این slug قبلاً استفاده شده');

    return this.prisma.course.create({ data: dto });
  }

  async update(id: string, dto: UpdateCourseDto) {
    await this.findOne(id);

    if (dto.slug) {
      const existing = await this.prisma.course.findFirst({
        where: { slug: dto.slug, NOT: { id } },
      });
      if (existing) throw new ConflictException('این slug قبلاً استفاده شده');
    }

    return this.prisma.course.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.course.delete({ where: { id } });
  }

  // دوره‌های ویژه برای صفحه اصلی
  async findFeatured() {
    return this.prisma.course.findMany({
      where: { isPublished: true, isFeatured: true },
      include: {
        category: { select: { name: true } },
        _count: { select: { sections: true } },
      },
      take: 6,
      orderBy: { order: 'asc' },
    });
  }
}
