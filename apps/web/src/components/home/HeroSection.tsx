'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[70vh] gap-6 px-4 md:px-12 pt-32 pb-16 relative">

      {/* badge — واقعی */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm"
        style={{
          background: 'rgba(18,33,49,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          color: '#d0bcff',
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
        }}
      >
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#d0bcff' }} />
        اشتراک مادام‌العمر — فقط ۱۰۰ دلار روی شبکه Polygon
      </motion.div>

      {/* عنوان — دقیقاً از Stitch با متن واقعی */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl leading-tight"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          color: '#d4e4fa',
          lineHeight: 1.25,
          textShadow: '0 0 20px rgba(255,182,139,0.4)',
        }}
      >
        ربات ترید خودکار کریپتو،
        <br />
        <span style={{
          background: 'linear-gradient(to left, #ffb68b, #d0bcff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          سود دلاری ۲۴ ساعته
        </span>
      </motion.h1>

      {/* توضیح — واقعی */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl"
        style={{ color: '#e0c0af', fontSize: '1.125rem', lineHeight: 1.8 }}
      >
        Repoint یک سیستم غیرمتمرکز روی بلاکچین Polygon است. با یک‌بار خرید اشتراک مادام‌العمر به ارزش ۱۰۰ دلار POL،
        ربات ترید خودکار ۲۴/۷ برایت معامله می‌کند و ۹۵٪ از سود مستقیم به کیف پولت واریز می‌شود.
      </motion.p>

      {/* دکمه‌ها — دقیقاً از Stitch */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-4"
      >
        <Link href="/courses"
          className="flex items-center gap-2 font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-1"
          style={{
            background: 'linear-gradient(to right, #ffb68b, #cc6600)',
            color: '#2a1000',
            boxShadow: '0 4px 24px rgba(255,122,0,0.2)',
          }}>
          شروع یادگیری رایگان ←
        </Link>
        <Link href="/#bots"
          className="flex items-center gap-2 px-8 py-4 rounded-lg transition-colors duration-300"
          style={{ border: '1px solid #d0bcff', color: '#d0bcff' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(208,188,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          مشاهده ربات‌ها 🤖
        </Link>
      </motion.div>

      {/* آمار — واقعی */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap justify-center gap-12 mt-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', width: '100%', maxWidth: '36rem' }}
      >
        {[
          { value: '۹۵٪', label: 'سود برای کاربر', color: '#ffb68b' },
          { value: '۱۰۰$', label: 'اشتراک مادام‌العمر', color: '#d0bcff' },
          { value: '۲۴/۷', label: 'ترید خودکار', color: '#bec6e0' },
        ].map(stat => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
            <span className="text-xs" style={{ color: '#6b8099' }}>{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
