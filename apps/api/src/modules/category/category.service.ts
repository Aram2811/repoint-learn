import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // لیست همه‌ی دسته‌بندی‌ها به صورت درخت (parent + children)
  async findAll() {
    return this.prisma.category.findMany({
      where: { parentId: null }, // فقط دسته‌های اصلی
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        _count: { select: { courses: true } },
      },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        courses: {
          where: { isPublished: true },
          select: { id: true, title: true, slug: true, thumbnailKey: true },
        },
      },
    });

    if (!category) throw new NotFoundException('دسته‌بندی یافت نشد');
    return category;
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: { children: true },
    });

    if (!category) throw new NotFoundException('دسته‌بندی یافت نشد');
    return category;
  }

  async create(dto: CreateCategoryDto) {
    // چک کن slug تکراری نباشه
    const existing = await this.prisma.category.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) throw new ConflictException('این slug قبلاً استفاده شده');

    return this.prisma.category.create({ data: dto });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id); // چک کن وجود داره

    // اگه slug عوض شد، تکراری نباشه
    if (dto.slug) {
      const existing = await this.prisma.category.findFirst({
        where: { slug: dto.slug, NOT: { id } },
      });
      if (existing) throw new ConflictException('این slug قبلاً استفاده شده');
    }

    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.category.delete({ where: { id } });
  }
}
