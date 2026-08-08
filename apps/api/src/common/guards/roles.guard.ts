// RolesGuard: بعد از اینکه JwtAuthGuard تأیید کرد "این کاربر کیه"،
// RolesGuard چک می‌کنه "آیا این کاربر اجازه‌ی این کار رو داره؟"
//
// استفاده:
//   @Roles('admin', 'super_admin')
//   @Get('users')
//   getAllUsers() { ... }
//
// اگه کاربر لاگین شده role کافی نداشته باشه → 403 Forbidden

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, Role } from '@repoint/database';

export const ROLES_KEY = 'roles';

// این decorator اجازه می‌ده روی endpoint بنویسیم @Roles('admin')
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

type UserWithRole = User & { role: Role };

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // چه نقش‌هایی برای این route لازمه؟
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // اگه هیچ نقشی مشخص نشده، همه می‌تونن دسترسی داشته باشن
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user: UserWithRole }>();
    const user = request.user;

    // super_admin همیشه همه جا دسترسی داره
    if (user?.role?.name === 'super_admin') return true;

    const hasRole = requiredRoles.includes(user?.role?.name ?? '');
    if (!hasRole) {
      throw new ForbiddenException('دسترسی کافی ندارید');
    }

    return true;
  }
}
