import type { Metadata } from "next";
import "./globals.css";

// نکته‌ی مهم: فونت گوگل (Geist) رو عمداً حذف کردیم.
// در اسپرینت طراحی UI، فونت فارسی Vazirmatn رو خودمون self-host می‌کنیم
// (یعنی فایل فونت روی سرور خودمون باشه نه گوگل) که هم سریع‌تره
// هم به دیتای کاربر متصل به گوگل نمی‌شه و هم در شبکه‌های محدود هم کار می‌کنه.

export const metadata: Metadata = {
  title: "Repoint Learn",
  description: "پلتفرم آموزشی Repoint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
