import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// تغییر SMS_PROVIDER در .env کافیه — mock یا kavenegar
@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly provider: string;

  constructor(private readonly config: ConfigService) {
    this.provider = this.config.get<string>('SMS_PROVIDER') ?? 'mock';
  }

  async sendOtp(phone: string, code: string): Promise<void> {
    const message = `کد تأیید Repoint Learn: ${code} (۵ دقیقه معتبر)`;
    switch (this.provider) {
      case 'kavenegar':
        await this.sendKavenegar(phone, message);
        break;
      default:
        this.sendMock(phone, code);
    }
  }

  private sendMock(phone: string, code: string): void {
    this.logger.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    this.logger.warn(`📱 [MOCK SMS] شماره: ${phone}`);
    this.logger.warn(`🔑 [MOCK SMS] کد OTP: ${code}`);
    this.logger.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  private async sendKavenegar(phone: string, message: string): Promise<void> {
    const apiKey = this.config.get<string>('KAVENEGAR_API_KEY');
    const sender = this.config.get<string>('KAVENEGAR_SENDER') ?? '10004346';
    if (!apiKey) throw new Error('KAVENEGAR_API_KEY تنظیم نشده');
    const url = `https://api.kavenegar.com/v1/${apiKey}/sms/send.json`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ receptor: phone, message, sender }).toString(),
    });
    const data = await res.json() as { return: { status: number; message: string } };
    if (data.return.status !== 200) throw new Error(`Kavenegar: ${data.return.message}`);
    this.logger.log(`✅ SMS ارسال شد به ${phone}`);
  }
}
