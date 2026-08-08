// @Public() decorator برای endpoint هایی که نیاز به احراز هویت ندارن.
//
// وقتی JwtAuthGuard رو به صورت Global فعال می‌کنیم (در AppModule)،
// همه‌ی routeها نیاز به JWT دارن — حتی POST /auth/send-otp که باید عمومی باشه!
//
// با @Public() به Guard می‌گیم "این route رو skip کن".
// Guard اول metadata رو چک می‌کنه، اگه @Public() بود، بدون بررسی توکن اجازه می‌ده.
//
// این روش بهتر از حالت برعکسه (همه Public، بعد @Protected اضافه کنی)
// چون به صورت پیش‌فرض همه چیز محافظت‌شده‌ست و اشتباه فراموش کردن امنیت کمتره.

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
