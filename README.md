# Repoint Learn

پلتفرم آموزشی فارسی برای آموزش Repoint — مونوریپو شامل فرانت‌اند (Next.js) و بک‌اند (NestJS).

## ساختار پروژه

```
repoint-learn/
├── apps/
│   ├── web/        → فرانت‌اند Next.js (App Router + TypeScript + TailwindCSS)
│   └── api/         → بک‌اند NestJS (TypeScript, REST API)
├── packages/
│   └── database/    → اسکیمای Prisma + Prisma Client مشترک بین web و api
└── turbo.json        → پیکربندی Turborepo برای اجرای موازی/کش بین پکیج‌ها
```

چرا Monorepo؟ چون frontend و backend به یک مدل داده‌ی مشترک (types، Prisma schema) نیاز دارن،
و با Turborepo می‌تونیم build/lint/test همه رو هماهنگ و با کش سریع اجرا کنیم — دقیقاً
همون الگویی که خیلی از تیم‌های Next.js/NestJS امروز استفاده می‌کنن.

## پیش‌نیازها برای اجرا روی کامپیوتر خودت

- Node.js نسخه ۲۰ به بالا
- PostgreSQL نسخه ۱۶ (یا با Docker)

## راه‌اندازی اولیه

```bash
npm install

# کپی کردن فایل env نمونه و پر کردن مقادیر واقعی
cp apps/api/.env.example apps/api/.env

# ساخت دیتابیس migration ها (روی کامپیوتر خودت با اینترنت آزاد)
npm run db:migrate

npm run dev
```

> **نکته:** در محیط توسعه‌ی Claude (sandbox)، دامنه‌ی دانلود باینری‌های Prisma
> (`binaries.prisma.sh`) مسدوده، پس دستورات `prisma generate` / `prisma migrate`
> اونجا قابل اجرا نیستن. ساختار دیتابیس با psql مستقیماً تست و تایید شده، ولی
> اجرای رسمی Prisma CLI رو باید روی کامپیوتر خودت (با اینترنت کامل) انجام بدی —
> که دقیقاً هم روش استاندارد توسعه‌ست.

## نقشه راه اسپرینت‌ها (Agile)

- [x] **Sprint 1 — پایه‌گذاری:** اسکلت Monorepo، اپ‌های web و api، اتصال PostgreSQL
- [ ] **Sprint 2 — مدل دیتابیس:** طراحی کامل Schema (Users, Roles, Courses, Videos, ...)
- [ ] **Sprint 3 — احراز هویت:** OTP، JWT، Refresh Token، RBAC
- [ ] **Sprint 4 — مدیریت محتوا:** دوره‌ها، دسته‌بندی‌ها، پنل ادمین پایه
- [ ] **Sprint 5 — استریم ویدیو:** آپلود، HLS، پخش‌کننده
- [ ] **Sprint 6 — صفحات عمومی و SEO**
- [ ] **Sprint 7 — داشبورد کاربر**
- [ ] **Sprint 8 — داشبورد ادمین پیشرفته**
- [ ] **Sprint 9 — امنیت، دیپلوی، مستندسازی نهایی**
