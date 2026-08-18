import {
  Injectable, BadRequestException, UnauthorizedException,
  Logger, NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SmsService } from '../sms/sms.service';
import { createHash, randomBytes } from 'crypto';
import type { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly sms: SmsService,
  ) {}

  async sendOtp(phone: string): Promise<{ message: string }> {
    const code = (randomBytes(3).readUIntBE(0, 3) % 1000000).toString().padStart(6, '0');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.otpCode.updateMany({
      where: { phone, usedAt: null },
      data: { usedAt: new Date() },
    });

    await this.prisma.otpCode.create({ data: { phone, code, expiresAt } });
    await this.sms.sendOtp(phone, code);
    return { message: 'کد تأیید ارسال شد' };
  }

  async verifyOtp(phone: string, code: string): Promise<{
    accessToken: string; refreshToken: string; isNewUser: boolean;
  }> {
    const otp = await this.prisma.otpCode.findFirst({
      where: { phone, code, usedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    });

    if (!otp) throw new BadRequestException('کد تأیید نامعتبر یا منقضی شده است');

    await this.prisma.otpCode.update({ where: { id: otp.id }, data: { usedAt: new Date() } });

    const defaultRole = await this.prisma.role.findUnique({ where: { name: 'user' } });
    if (!defaultRole) throw new Error('نقش user در دیتابیس وجود ندارد — seed اجرا کنید');

    const existingUser = await this.prisma.user.findUnique({ where: { phone } });
    const isNewUser = !existingUser;

    const user = await this.prisma.user.upsert({
      where: { phone },
      update: { isVerified: true },
      create: { phone, isVerified: true, roleId: defaultRole.id },
      include: { role: true },
    });

    const tokens = await this.generateTokens(user.id, user.phone, user.role.name);
    return { ...tokens, isNewUser };
  }

  async completeProfile(userId: string, data: { name: string }) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('کاربر یافت نشد');
    return this.prisma.user.update({
      where: { id: userId },
      data: { name: data.name },
      select: { id: true, phone: true, name: true, isVerified: true },
    });
  }

  async refreshTokens(rawRefreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const tokenHash = this.hashToken(rawRefreshToken);
    const stored = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: { include: { role: true } } },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date() || !stored.user.isActive) {
      throw new UnauthorizedException('توکن نامعتبر یا منقضی شده است');
    }

    await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
    return this.generateTokens(stored.user.id, stored.user.phone, stored.user.role.name);
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  private async generateTokens(userId: string, phone: string, role: string) {
    const payload: JwtPayload = { sub: userId, phone, role };
    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: (this.config.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m') as any,
    });

    const rawRefreshToken = randomBytes(40).toString('hex');
    const tokenHash = this.hashToken(rawRefreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.prisma.refreshToken.create({ data: { tokenHash, userId, expiresAt } });
    return { accessToken, refreshToken: rawRefreshToken };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
