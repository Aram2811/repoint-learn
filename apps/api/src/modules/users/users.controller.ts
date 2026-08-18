import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';
import type { User } from '@repoint/database';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  // GET /api/users/me/bookmarks
  @Get('me/bookmarks')
  async getMyBookmarks(@CurrentUser() user: User) {
    return this.prisma.bookmark.findMany({
      where: { userId: user.id },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            duration: true,
            section: {
              select: {
                course: {
                  select: { title: true, slug: true },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // GET /api/users/me/history
  @Get('me/history')
  async getMyHistory(@CurrentUser() user: User) {
    return this.prisma.watchHistory.findMany({
      where: { userId: user.id },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            duration: true,
            section: {
              select: {
                course: {
                  select: { title: true, slug: true },
                },
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: 20,
    });
  }
}
