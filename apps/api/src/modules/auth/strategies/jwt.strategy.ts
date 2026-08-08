// چرا Strategy؟
// Passport یه framework احراز هویت هست که مفهوم "Strategy" داره.
// هر Strategy یه روش احراز هویت رو پیاده می‌کنه (JWT، Google OAuth، Local...).
//
// JwtStrategy به Passport می‌گه:
//   1. توکن رو از کجا بخون (اینجا: از Authorization header یا Cookie)
//   2. با چه secret توکن رو verify کن
//   3. بعد از verify، اطلاعات کاربر رو چطور از دیتابیس بگیر

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';

// این interface مشخص می‌کنه چه چیزی داخل JWT payload قرار می‌گیره
export interface JwtPayload {
  sub: string;   // subject = userId (استاندارد JWT)
  phone: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      // اول Cookie رو چک می‌کنه، اگه نبود Authorization header رو
      // این برای پشتیبانی از هر دو حالت (browser با cookie، Postman با header) مفیده
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return (req?.cookies?.['access_token'] as string | undefined) ?? null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET') ?? 'fallback-secret',
    });
  }

  // این متد بعد از verify موفق توکن فراخوانی می‌شه
  // مقدار برگشتی در req.user قرار می‌گیره
  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { role: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('کاربر یافت نشد یا غیرفعال است');
    }

    return user; // این مقدار در req.user قرار می‌گیره
  }
}
