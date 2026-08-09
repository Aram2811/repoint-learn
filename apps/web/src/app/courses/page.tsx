'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShaderBackground from '@/components/ui/ShaderBackground';

const CATEGORIES = ['همه', 'دوره‌های ویدیویی', 'راهنماها'];

const FEATURED_COURSE = {
  badge: 'FEATURED',
  title: 'راه‌اندازی کامل Repoint از صفر تا صد',
  desc: 'در این دوره جامع، نصب Trust Wallet، تهیه POL، ثبت‌نام با کد معرف، انتخاب ربات و مدیریت سرمایه رو کامل یاد می‌گیری.',
  duration: '۳ ساعت',
  level: 'مبتدی',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL9wV-UYk5_qmxylk_tIejcsaT30ukg-I6KfWGfPj0IYxu5Wczj7HYAYgZduRkDaGBhEt5Q9dzdibj1NetJEFGMyzrEnrK93OpaaEuTwtR1OLTPyB_QYTGAPPZVpzUJQD4Rk8wRZvn6fm4f-lPnOQLwgji5rDoBk891SE-s6B2rQz19if5Zj_LQWPq_RuH_Ml87qKSHkecaHdv_OFGXSrReGOSa2rIupXU5UXf2v5FfzIkJheWSQy6',
};

const SIDE_CONTENT = [
  {
    type: 'راهنما',
    typeColor: '#bec6e0',
    title: 'شبکه Polygon چیست و چرا Repoint از آن استفاده می‌کند؟',
    desc: 'آشنایی با بلاکچین Polygon، توکن POL و مزایای استفاده از آن در سیستم‌های DeFi.',
    time: '۱۰ دقیقه مطالعه',
  },
  {
    type: 'راهنما',
    typeColor: '#bec6e0',
    title: 'سیستم رفرال و استخر روزانه Repoint چطور کار می‌کند؟',
    desc: 'توضیح کامل سیستم معرف، باینری و استخر روزانه با ارقام واقعی.',
    time: '۱۵ دقیقه مطالعه',
  },
];

const COURSES = [
  {
    cat: 'شروع با Repoint',
    catColor: '#ffb68b',
    title: 'نصب و تنظیم Trust Wallet برای Repoint',
    duration: '۴۵ دقیقه',
    level: 'مبتدی',
    icon: '👛',
  },
  {
    cat: 'Repoint Bot',
    catColor: '#ffb68b',
    title: 'مقایسه Ruby، Topaz و Garnet — کدام ربات مناسب توئه؟',
    duration: '۳۰ دقیقه',
    level: 'مبتدی',
    icon: '🤖',
  },
  {
    cat: 'مدیریت سرمایه',
    catColor: '#d0bcff',
    title: 'محاسبه سود واقعی و مدیریت انتظارات در Repoint',
    duration: '۱ ساعت',
    level: 'متوسط',
    icon: '📊',
  },
  {
    cat: 'درآمد از معرف',
    catColor: '#10B981',
    title: 'استفاده حداکثری از سیستم رفرال Repoint',
    duration: '۴۵ دقیقه',
    level: 'متوسط',
    icon: '🤝',
  },
  {
    cat: 'امنیت',
    catColor: '#bec6e0',
    title: 'نگه‌داری ایمن از seed phrase و کیف پول',
    duration: '۳۰ دقیقه',
    level: 'مبتدی',
    icon: '🔐',
  },
  {
    cat: 'Polygonscan',
    catColor: '#d0bcff',
    title: 'بررسی و استعلام قرارداد Repoint روی Polygonscan',
    duration: '۲۰ دقیقه',
    level: 'مبتدی',
    icon: '⛓️',
  },
];

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('همه');

  const filtered = COURSES.filter(c =>
    c.title.includes(search) || c.cat.includes(search)
  );

  return (
    <>
      <ShaderBackground />
      <Navbar />
      <main className="min-h-screen relative z-10 pt-24 pb-24 px-4 md:px-12 max-w-screen-xl mx-auto flex flex-col gap-16">

        {/* هدر صفحه */}
        <section className="flex flex-col md:flex-row-reverse justify-between items-start md:items-end gap-6 mt-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold" style={{ color: '#d4e4fa' }}>
              مرکز{' '}
              <span style={{
                background: 'linear-gradient(to left, #ffb68b, #d0bcff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                آموزش
              </span>
            </h1>
            <p className="text-lg" style={{ color: '#e0c0af' }}>
              آموزش کامل Repoint از صفر — همه‌چیز رایگان است
            </p>
          </div>

          {/* سرچ و فیلتر */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <span className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#6b8099' }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="جستجو در آموزش‌ها..."
                className="w-full rounded-full py-2 pr-10 pl-4 text-sm outline-none"
                style={{
                  background: 'rgba(18,33,49,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#d4e4fa',
                }}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm transition-colors"
                  style={{
                    background: activeCategory === cat ? 'rgba(255,182,139,0.2)' : 'rgba(18,33,49,0.6)',
                    border: `1px solid ${activeCategory === cat ? 'rgba(255,182,139,0.6)' : 'rgba(255,255,255,0.08)'}`,
                    color: activeCategory === cat ? '#ffb68b' : '#a0b4c8',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Course — Bento Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* کارت اصلی */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 rounded-2xl h-96 flex flex-col justify-end p-8 relative overflow-hidden group cursor-pointer"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="absolute inset-0"
              style={{
                backgroundImage: `url('${FEATURED_COURSE.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.4,
                transition: 'opacity 0.5s',
              }} />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, #051424 30%, transparent)' }} />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ background: 'rgba(255,182,139,0.2)', border: '1px solid rgba(255,182,139,0.3)', color: '#ffb68b' }}>
                  {FEATURED_COURSE.badge}
                </span>
                <span className="text-xs" style={{ color: '#6b8099' }}>⏱ {FEATURED_COURSE.duration}</span>
                <span className="text-xs" style={{ color: '#6b8099' }}>📶 {FEATURED_COURSE.level}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors"
                style={{ color: '#d4e4fa' }}>
                {FEATURED_COURSE.title}
              </h2>
              <p className="text-sm line-clamp-2" style={{ color: '#a0b4c8' }}>{FEATURED_COURSE.desc}</p>
              <div className="pt-2">
                <Link href="/courses/repoint-setup"
                  className="inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-lg"
                  style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000' }}>
                  شروع دوره ▶
                </Link>
              </div>
            </div>
          </motion.div>

          {/* کارت‌های کناری */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {SIDE_CONTENT.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex-1 rounded-xl p-5 flex flex-col justify-between group cursor-pointer transition-colors"
                style={{
                  background: 'rgba(18,33,49,0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: 'rgba(39,54,71,0.8)', color: item.typeColor }}>
                    {item.type}
                  </span>
                  <span className="text-lg group-hover:translate-x-[-4px] transition-transform" style={{ color: '#6b8099' }}>↗</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2 leading-snug group-hover:text-secondary transition-colors"
                    style={{ color: '#d4e4fa' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#6b8099' }}>{item.desc}</p>
                </div>
                <div className="text-xs mt-3" style={{ color: '#6b8099' }}>⏱ {item.time}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* گرید دوره‌ها */}
        <section>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#d4e4fa' }}>همه آموزش‌ها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course, i) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: 'rgba(18,33,49,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                <div className="h-32 flex items-center justify-center relative"
                  style={{ background: 'linear-gradient(135deg, rgba(13,28,45,0.9), rgba(39,54,71,0.5))' }}>
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {course.icon}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <span className="text-xs font-mono" style={{ color: course.catColor }}>{course.cat}</span>
                  <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors"
                    style={{ color: '#d4e4fa' }}>
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs" style={{ color: '#6b8099' }}>⏱ {course.duration}</span>
                    <span className="text-xs px-2 py-0.5 rounded"
                      style={{ background: 'rgba(39,54,71,0.8)', color: '#bec6e0', fontFamily: 'monospace' }}>
                      {course.level}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
