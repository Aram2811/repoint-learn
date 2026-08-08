import {
  Controller, Get, Post, Patch, Delete,
  Param, Body, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles, RolesGuard } from '../../common/guards/roles.guard';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // عمومی
  @Public()
  @Get()
  findAll() {
    return this.courseService.findAllPublished();
  }

  @Public()
  @Get('featured')
  findFeatured() {
    return this.courseService.findFeatured();
  }

  @Public()
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.courseService.findBySlug(slug);
  }

  // ادمین — لیست همه (شامل unpublished)
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Get('admin/all')
  findAllAdmin() {
    return this.courseService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('super_admin')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
