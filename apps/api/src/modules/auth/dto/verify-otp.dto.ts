import { IsString, Matches, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @Matches(/^09[0-9]{9}$/, {
    message: 'شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد',
  })
  phone: string;

  @IsString()
  @Length(6, 6, { message: 'کد تأیید باید ۶ رقم باشد' })
  // @Matches(/^[0-9]{6}$/) هم می‌شه اضافه کرد، ولی Length کافیه
  code: string;
}
