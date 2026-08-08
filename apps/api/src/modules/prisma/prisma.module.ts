// چرا @Global()؟
// PrismaService رو در تقریباً همه‌ی ماژول‌ها نیاز داریم (Auth، Course، User...).
// بدون @Global() باید در هر ماژول جداگانه import کنیم.
// با @Global() فقط یه بار در AppModule import می‌کنیم و همه جا در دسترسه.

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
