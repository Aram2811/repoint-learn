// AuthController: لایه‌ی HTTP روی AuthService.
// وظیفه‌اش فقط اینه که:
//   1. Request رو بگیره و validate کنه (با DTO)
//   2. AuthService رو صدا بزنه
//   3. Response رو برگردونه (شامل set کردن Cookie)
//
// هیچ logic تجاری اینجا نیست — همه چیز در Service هست.
// این اصل Single Responsibility هست.

import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { User } from '@repoint/database';

// تنظیمات Cookie — یه بار تعریف می‌کنیم تا همه جا یکسان باشه
const COOKIE_OPTIONS = {
  httpOnly: true,    // JavaScript نمی‌تونه بخونه — محافظت در برابر XSS
  secure: process.env.NODE_ENV === 'production', // فقط در HTTPS (در production)
  sameSite: 'lax' as const, // محافظت در برابر CSRF
  path: '/',
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/send-otp
  // عمومیه — هر کسی (لاگین نشده) می‌تونه صداش بزنه
  @Public()
  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendOtp(dto.phone);
  }

  // POST /auth/verify-otp
  // توکن‌ها رو در Cookie ذخیره می‌کنه (نه در Body)
  // چرا Cookie به جای Body؟
  //   - Cookie با httpOnly: JavaScript نمی‌تونه بخونه → امنیت XSS بهتر
  //   - Browser به طور خودکار Cookie رو با هر request می‌فرسته
  //   - توکن در localStorage آسیب‌پذیرتره
  @Public()
  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(
    @Body() dto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
    // passthrough: true یعنی بعد از set کردن cookie، NestJS
    // خودش response رو می‌فرسته — بدون اینکه ما res.send() بزنیم
  ) {
    const { accessToken, refreshToken } =
      await this.authService.verifyOtp(dto.phone, dto.code);

    // Set کردن توکن‌ها در Cookie
    res.cookie('access_token', accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000, // 15 دقیقه (میلی‌ثانیه)
    });

    res.cookie('refresh_token', refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 روز
      path: '/auth/refresh', // این cookie فقط به /auth/refresh فرستاده می‌شه
    });

    return { message: 'ورود موفق' };
  }

  // POST /auth/refresh
  // Refresh Token رو از Cookie می‌خونه و Access Token جدید می‌ده
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const rawRefreshToken = req.cookies?.['refresh_token'] as string | undefined;

    if (!rawRefreshToken) {
      throw new Error('Refresh token not found');
    }

    const { accessToken, refreshToken } =
      await this.authService.refreshTokens(rawRefreshToken);

    res.cookie('access_token', accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh',
    });

    return { message: 'توکن تجدید شد' };
  }

  // POST /auth/logout
  // نیاز به JWT دارد (کاربر باید لاگین باشه)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(user.id);

    // Cookie ها رو حذف کن (maxAge=0)
    res.clearCookie('access_token');
    res.clearCookie('refresh_token', { path: '/auth/refresh' });

    return { message: 'خروج موفق' };
  }

  // GET /auth/me — برای تست: اطلاعات کاربر لاگین شده
  @UseGuards(JwtAuthGuard)
  @Post('me')
  @HttpCode(HttpStatus.OK)
  getMe(@CurrentUser() user: User) {
    // پسورد یا اطلاعات حساس نداریم ولی id و phone رو نمایش می‌دیم
    return {
      id: user.id,
      phone: user.phone,
      name: user.name,
      isVerified: user.isVerified,
    };
  }
}
