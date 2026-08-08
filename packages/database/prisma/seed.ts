// این فایل هنگام `npm run db:seed` اجرا می‌شه.
// هدف: ساخت داده‌های اولیه‌ای که بدون اون‌ها سیستم کار نمی‌کنه.
//
// چه چیزی اینجاست؟
//   1. نقش‌های پیش‌فرض (guest, user, admin, super_admin)
//   2. یه کاربر super_admin برای اولین ورود به پنل
//
// چه چیزی اینجا نیست؟
//   داده‌های تست (دوره‌های نمونه و ...) — اون‌ها در فایل‌های fixture جداگانه خواهند بود.

import { PrismaClient } from '../generated';

const prisma = new PrismaClient();

const ROLES = [
  {
    name: 'guest',
    displayName: 'مهمان',
    permissions: [], // هیچ دسترسی خاصی ندارند
  },
  {
    name: 'user',
    displayName: 'کاربر',
    permissions: [
      'lesson:view',
      'course:view',
      'watchhistory:write',
      'bookmark:write',
      'consultation:create',
    ],
  },
  {
    name: 'admin',
    displayName: 'مدیر',
    permissions: [
      'lesson:view',
      'lesson:create',
      'lesson:update',
      'course:view',
      'course:create',
      'course:update',
      'user:view',
      'user:update',
      'consultation:manage',
      'media:upload',
      'audit_log:view',
    ],
  },
  {
    name: 'super_admin',
    displayName: 'سوپر ادمین',
    permissions: ['*'], // دسترسی کامل به همه چیز
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // ساخت نقش‌ها — upsert به این معنیه که اگه وجود داشت، update می‌کنه
  // و اگه نداشت، create می‌کنه. ایمنه برای چند بار اجرا کردن.
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { displayName: role.displayName, permissions: role.permissions },
      create: role,
    });
    console.log(`  ✓ Role: ${role.name}`);
  }

  // ساخت super_admin اولیه
  const superAdminRole = await prisma.role.findUnique({
    where: { name: 'super_admin' },
  });

  if (!superAdminRole) throw new Error('super_admin role not found after seed!');

  const adminPhone = process.env.SEED_ADMIN_PHONE ?? '09100000000';

  await prisma.user.upsert({
    where: { phone: adminPhone },
    update: {},
    create: {
      phone: adminPhone,
      name: 'سوپر ادمین',
      isVerified: true,
      roleId: superAdminRole.id,
    },
  });
  console.log(`  ✓ Super admin: ${adminPhone}`);

  console.log('✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
