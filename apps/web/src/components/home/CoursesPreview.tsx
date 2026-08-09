'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const COURSES = [
  {
    cat: 'شروع با Repoint',
    catColor: '#ffb68b',
    title: 'راه‌اندازی کامل ربات Repoint از صفر',
    duration: '۳ ساعت',
    icon: '🤖',
  },
  {
    cat: 'Trust Wallet',
    catColor: '#d0bcff',
    title: 'نصب و تنظیم کیف پول و شبکه Polygon',
    duration: '۴۵ دقیقه',
    icon: '👛',
  },
  {
    cat: 'مدیریت سرمایه',
    catColor: '#bec6e0',
    title: 'انتخاب ربات مناسب بر اساس سرمایه',
    duration: '۱ ساعت',
    icon: '📊',
  },
  {
    cat: 'درآمد از معرف',
    catColor: '#10B981',
    title: 'سیستم رفرال و استخر روزانه Repoint',
    duration: '۱ ساعت',
    icon: '🤝',
  },
];

export default function CoursesPreview() {
  return (
    <section className="px-4 md:px-12 max-w-screen-xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end mb-8"
      >
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#d4e4fa' }}>دوره‌های آموزشی</h2>
          <p className="mt-2 text-sm" style={{ color: '#e0c0af' }}>
            همه آموزش‌ها رایگان — از صفر تا راه‌اندازی کامل
          </p>
        </div>
        <Link href="/courses" className="hidden md:flex items-center gap-1 text-xs"
          style={{ color: '#ffb68b' }}>
          مشاهده همه ←
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {COURSES.map((course, i) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
            style={{
              background: 'rgba(28,43,60,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* thumbnail */}
            <div className="h-36 flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, rgba(13,28,45,0.9), rgba(39,54,71,0.6))' }}>
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {course.icon}
              </span>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <span className="text-xs font-mono" style={{ color: course.catColor }}>
                {course.cat}
              </span>
              <h4 className="font-semibold text-sm leading-snug" style={{ color: '#d4e4fa' }}>
                {course.title}
              </h4>
              <div className="flex items-center gap-1 text-xs mt-1" style={{ color: '#6b8099' }}>
                <span>⏱</span> {course.duration}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm transition-colors duration-300"
          style={{ border: '1px solid rgba(208,188,255,0.35)', color: '#d0bcff' }}
        >
          مشاهده همه آموزش‌ها ←
        </Link>
      </div>
    </section>
  );
}
