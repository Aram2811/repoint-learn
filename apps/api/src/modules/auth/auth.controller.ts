import {
  Controller, Post, Body, Res, Req,
  HttpCode, HttpStatus, UseGuards, Patch,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { User } from '@repoint/database';

const COOKIE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  sendOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendOtp(dto.phone);
  }

  @Public()
  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() dto: VerifyOtpDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, isNewUser } =
      await this.authService.verifyOtp(dto.phone, dto.code);

    res.cookie('access_token', accessToken, { ...COOKIE, maxAge: 15 * 60 * 1000 });
    res.cookie('refresh_token', refreshToken, { ...COOKIE, maxAge: 30 * 24 * 60 * 60 * 1000, path: '/auth/refresh' });

    return { message: 'ورود موفق', isNewUser };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('complete-profile')
  @HttpCode(HttpStatus.OK)
  completeProfile(@Body() dto: CompleteProfileDto, @CurrentUser() user: User) {
    return this.authService.completeProfile(user.id, { name: dto.name });
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const raw = req.cookies?.['refresh_token'] as string | undefined;
    if (!raw) throw new Error('Refresh token not found');
    const { accessToken, refreshToken } = await this.authService.refreshTokens(raw);
    res.cookie('access_token', accessToken, { ...COOKIE, maxAge: 15 * 60 * 1000 });
    res.cookie('refresh_token', refreshToken, { ...COOKIE, maxAge: 30 * 24 * 60 * 60 * 1000, path: '/auth/refresh' });
    return { message: 'توکن تجدید شد' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(user.id);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token', { path: '/auth/refresh' });
    return { message: 'خروج موفق' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  @HttpCode(HttpStatus.OK)
  getMe(@CurrentUser() user: User) {
    return { id: user.id, phone: user.phone, name: user.name, isVerified: user.isVerified };
  }
}
