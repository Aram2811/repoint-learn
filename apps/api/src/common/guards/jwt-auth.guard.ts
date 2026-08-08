// Guard در NestJS یعنی چه؟
// Guard یه کلاسه که قبل از Handler اجرا می‌شه و تصمیم می‌گیره
// request اجازه‌ی ادامه داره یا نه (true/false).
//
// JwtAuthGuard از AuthGuard پایه‌ی Passport ارث می‌بره
// و فقط یه کار اضافه می‌کنه: اگه route با @Public() مارک شده باشه،
// validation رو skip می‌کنه.

import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Reflector: ابزار NestJS برای خواندن metadata که با دکوراتورها set شده
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),  // متد handler (@Public() روی method)
      context.getClass(),    // کلاس controller (@Public() روی class)
    ]);

    // اگه route عمومیه، بدون بررسی JWT اجازه بده
    if (isPublic) return true;

    // در غیر اینصورت، Passport JWT validation رو اجرا کن
    return super.canActivate(context);
  }
}
