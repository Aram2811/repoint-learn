import { IsString, Matches } from 'class-validator';

export class SendOtpDto {
  @IsString()
  @Matches(/^09[0-9]{9}$/, { message: 'شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد' })
  phone: string;
}
