// DTO = Data Transfer Object
// وظیفه‌اش اینه که داده‌ی ورودی از کاربر رو validate کنه
// قبل از اینکه به Service برسه.
//
// class-validator با دکوراتورها اعتبارسنجی رو خوانا و قابل نگهداری می‌کنه.
// وقتی ValidationPipe فعاله، اگه داده اشتباه باشه، NestJS خودش
// خطای 400 برمی‌گردونه — ما نیازی به if/else نداریم.

import { IsString, Matches } from 'class-validator';

export class SendOtpDto {
  @IsString()
  // فرمت موبایل ایران: 09xxxxxxxxx (11 رقم، با 09 شروع می‌شه)
  @Matches(/^09[0-9]{9}$/, {
    message: 'شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد',
  })
  phone: string;
}
