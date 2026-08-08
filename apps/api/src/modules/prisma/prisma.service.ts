// PrismaService چیه و چرا لازمه؟
//
// PrismaClient یه کلاس معمولیه. ولی در NestJS همه چیز با Dependency Injection
// کار می‌کنه — یعنی به جای اینکه هر جا "new PrismaClient()" بنویسیم،
// یه نمونه‌ی واحد (Singleton) می‌سازیم و NestJS اون رو هر جا لازم باشه inject می‌کنه.
//
// این مزایا رو داره:
//   1. فقط یه connection pool به دیتابیس داریم (نه هزاران connection)
//   2. تست کردن راحت‌تره (می‌تونیم mock کنیم)
//   3. lifecycle درست: هنگام shutdown برنامه، connection بسته می‌شه

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@repoint/database';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // onModuleInit: وقتی ماژول NestJS راه‌اندازی می‌شه، connection به DB باز می‌شه
  async onModuleInit() {
    await this.$connect();
  }

  // onModuleDestroy: وقتی برنامه خاموش می‌شه، connection بسته می‌شه
  // بدون این، PostgreSQL connections رو باز نگه می‌داره که هدر رفتن منابعه
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
