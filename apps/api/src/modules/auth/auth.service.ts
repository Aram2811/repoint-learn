// AuthService قلب سیستم احراز هویته.
// سه کار اصلی انجام می‌ده:
//   1. sendOtp: تولید کد ۶ رقمی و ارسال (mock یا واقعی)
//   2. verifyOtp: اعتبارسنجی کد، ساخت/پیدا کردن user، صدور توکن‌ها
//   3. refreshTokens: تبادل Refresh Token با Access Token جدید

import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { createHash, randomBytes } from 'crypto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  // Logger: به جای console.log، از Logger استاندارد NestJS استفاده می‌کنیم
  // چون می‌تونه level (info/warn/error) و context (نام service) رو نشون بده
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ──────────────────────────────────────────────
  // STEP 1: ارسال OTP
  // ──────────────────────────────────────────────
  async sendOtp(phone: string): Promise<{ message: string }> {
    // تولید کد ۶ رقمی تصادفی
    // Math.random() برای OTP امن نیست! باید از crypto استفاده کرد.
    // randomBytes(3) → ۳ بایت تصادفی → عدد ۰ تا ۱۶۷۷۷۲۱۵
    // % 1000000 → ۶ رقم، padStart برای صفرهای پیشین (مثل 007342)
    const code = (randomBytes(3).readUIntBE(0, 3) % 1000000)
      .toString()
      .padStart(6, '0');

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // ۵ دقیقه

    // OTPهای قبلی این شماره رو invalidate کن
    // (کاربر اگه دوباره درخواست بده، کد قدیمی کار نکنه)
    await this.prisma.otpCode.updateMany({
      where: { phone, usedAt: null },
      data: { usedAt: new Date() },
    });

    // OTP جدید رو ذخیره کن
    await this.prisma.otpCode.create({
      data: { phone, code, expiresAt },
    });

    // ارسال پیامک — فعلاً Mock
    await this.sendSms(phone, code);

    return { message: 'کد تأیید ارسال شد' };
  }

  // ──────────────────────────────────────────────
  // STEP 2: تأیید OTP و صدور توکن
  // ──────────────────────────────────────────────
  async verifyOtp(
    phone: string,
    code: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // پیدا کردن آخرین OTP فعال برای این شماره
    const otp = await this.prisma.otpCode.findFirst({
      where: {
        phone,
        code,
        usedAt: null,             // هنوز استفاده نشده
        expiresAt: { gt: new Date() }, // هنوز منقضی نشده
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otp) {
      throw new BadRequestException('کد تأیید نامعتبر یا منقضی شده است');
    }

    // OTP رو مصرف‌شده علامت بزن
    await this.prisma.otpCode.update({
      where: { id: otp.id },
      data: { usedAt: new Date() },
    });

    // کاربر رو پیدا کن یا بساز (اولین ورود = ثبت‌نام خودکار)
    // چرا upsert؟ چون نمی‌دونیم کاربر قبلاً ثبت‌نام کرده یا نه.
    // این الگوی "بدون ثبت‌نام جداگانه" در پلتفرم‌های OTP-based رایجه.
    const defaultRole = await this.prisma.role.findUnique({
      where: { name: 'user' },
    });

    if (!defaultRole) {
      throw new Error('نقش پیش‌فرض user در دیتابیس وجود ندارد. لطفاً seed را اجرا کنید.');
    }

    const user = await this.prisma.user.upsert({
      where: { phone },
      update: { isVerified: true },
      create: {
        phone,
        isVerified: true,
        roleId: defaultRole.id,
      },
      include: { role: true },
    });

    // تولید توکن‌ها
    return this.generateTokens(user.id, user.phone, user.role.name);
  }

  // ──────────────────────────────────────────────
  // STEP 3: تجدید Access Token با Refresh Token
  // ──────────────────────────────────────────────
  async refreshTokens(
    rawRefreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // توکن رو هش کن و در دیتابیس جستجو کن
    // چرا هش؟ چون ما توکن خام رو در دیتابیس ذخیره نمی‌کنیم (امنیت)
    const tokenHash = this.hashToken(rawRefreshToken);

    const stored = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: { include: { role: true } } },
    });

    if (
      !stored ||
      stored.revokedAt ||
      stored.expiresAt < new Date() ||
      !stored.user.isActive
    ) {
      throw new UnauthorizedException('توکن نامعتبر یا منقضی شده است');
    }

    // Refresh Token Rotation: توکن قدیمی رو باطل کن و جدید صادر کن
    // این کار یعنی هر Refresh Token فقط یه بار قابل استفاده‌ست
    // اگه کسی توکن دزدیده باشه و استفاده کنه، صاحب اصلی توکن جدید می‌گیره
    // و توکن دزدیده‌شده باطل می‌شه — این یه لایه‌ی امنیتی مهمه
    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return this.generateTokens(
      stored.user.id,
      stored.user.phone,
      stored.user.role.name,
    );
  }

  // ──────────────────────────────────────────────
  // LOGOUT: باطل کردن Refresh Token
  // ──────────────────────────────────────────────
  async logout(userId: string): Promise<void> {
    // همه‌ی Refresh Tokenهای این کاربر رو باطل کن (خروج از همه دستگاه‌ها)
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  // ──────────────────────────────────────────────
  // PRIVATE HELPERS
  // ──────────────────────────────────────────────

  private async generateTokens(
    userId: string,
    phone: string,
    role: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = { sub: userId, phone, role };

    // Access Token: کوتاه‌مدت (15 دقیقه)، در حافظه نگه داشته می‌شه
    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: (this.config.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m') as any,
    });

    // Refresh Token: بلندمدت (30 روز)، در دیتابیس ذخیره می‌شه
    const rawRefreshToken = randomBytes(40).toString('hex'); // 80 کاراکتر hex
    const tokenHash = this.hashToken(rawRefreshToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 روز بعد

    await this.prisma.refreshToken.create({
      data: { tokenHash, userId, expiresAt },
    });

    return { accessToken, refreshToken: rawRefreshToken };
  }

  // SHA-256 hash بدون salt — برای Refresh Token کافیه
  // (برعکس پسورد که باید bcrypt با salt استفاده کرد)
  // چرا؟ چون Refresh Token خودش 40 بایت تصادفیه و خودش entropy کافی داره
  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  // Mock SMS Provider
  // وقتی SMS_PROVIDER=mock باشه، کد رو در log می‌نویسه
  // وقتی SMS_PROVIDER=kavenegar باشه، API واقعی رو صدا می‌زنه
  private async sendSms(phone: string, code: string): Promise<void> {
    const provider = this.config.get<string>('SMS_PROVIDER') ?? 'mock';

    if (provider === 'mock') {
      // در محیط توسعه، کد رو در terminal نشون می‌ده
      this.logger.log(`[MOCK SMS] کد OTP برای ${phone}: ${code}`);
      return;
    }

    // TODO: وقتی اکانت Kavenegar گرفتی، اینجا implement کن
    this.logger.warn(`SMS provider "${provider}" هنوز پیاده‌سازی نشده`);
  }
}
