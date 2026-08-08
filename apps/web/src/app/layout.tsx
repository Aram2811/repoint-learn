import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Repoint Learn — آموزش حرفه‌ای',
    template: '%s | Repoint Learn',
  },
  description: 'پلتفرم آموزشی تخصصی Repoint — یادگیری حرفه‌ای با بهترین مدرسان',
  keywords: ['آموزش', 'Repoint', 'یادگیری آنلاین'],
  openGraph: {
    locale: 'fa_IR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preload" href="/fonts/Vazirmatn-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Vazirmatn-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
