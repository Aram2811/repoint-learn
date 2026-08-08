'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const STATS = [
  { value: '۸۰٪', label: 'سود برای کاربر' },
  { value: '۳', label: 'ربات فعال' },
  { value: '۲۴/۷', label: 'ترید خودکار' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center"
      style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 50%, #24243e 100%)' }}>

      {/* پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#F59E0B" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-400"
            style={{ top: `${20 + i * 12}%`, left: `${10 + i * 15}%`, opacity: 0.6 }}
            animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* متن */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#FCD34D' }}
            >
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-amber-400" />
              ربات ترید خودکار روی شبکه Polygon
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: 'white' }}>
              با <span style={{ color: '#F59E0B' }}>Repoint</span> بدون تجربه،
              <br />
              <span style={{ background: 'linear-gradient(90deg, #F59E0B, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                درآمد دلاری
              </span> داشته باش
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: '#CBD5E1' }}>
              Repoint یک ربات ترید خودکار ارز دیجیتال روی بلاکچین Polygon هست.
              در این پلتفرم یاد می‌گیری چطور ثبت‌نام کنی، ربات رو راه‌اندازی کنی
              و از سود ماهانه‌اش بهره‌مند بشی — حتی اگه هیچ سابقه‌ای در کریپتو نداری.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/courses"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-all duration-200"
                style={{ background: '#F59E0B', color: 'white', boxShadow: '0 0 30px rgba(245,158,11,0.4)' }}>
                شروع یادگیری رایگان ←
              </Link>
              <Link href="/consultation"
                className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl transition-all duration-200"
                style={{ border: '2px solid rgba(245,158,11,0.5)', color: '#FCD34D' }}>
                مشاوره رایگان
              </Link>
            </div>

            <div className="flex gap-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold" style={{ color: '#F59E0B' }}>{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: '#94A3B8' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* داشبورد انیمیشنی */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(245,158,11,0.2)', backdropFilter: 'blur(20px)' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                    style={{ background: '#F59E0B', color: 'white' }}>R</div>
                  <div>
                    <div className="font-bold" style={{ color: 'white' }}>Repoint Dashboard</div>
                    <div className="text-xs" style={{ color: '#94A3B8' }}>ربات Ruby فعال است</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(34,197,94,0.15)', color: '#4ADE80' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Live
                </div>
              </div>

              {/* نمودار */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2" style={{ color: '#94A3B8' }}>
                  <span>سود این ماه</span>
                  <span style={{ color: '#4ADE80' }}>+۱۲.۸٪</span>
                </div>
                <div className="flex items-end gap-1 h-16">
                  {[40,65,45,80,60,90,75,95,70,100,85,110].map((h, i) => (
                    <motion.div key={i}
                      initial={{ height: 0 }} animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                      className="flex-1 rounded-t"
                      style={{ background: i === 11 ? '#F59E0B' : 'rgba(245,158,11,0.3)' }}
                    />
                  ))}
                </div>
              </div>

              {/* ربات‌ها */}
              {[
                { name: 'Ruby Bot', profit: '+۸٪', color: '#EF4444', status: 'در حال ترید' },
                { name: 'Topaz Bot', profit: '+۱۲٪', color: '#F59E0B', status: 'در حال ترید' },
                { name: 'Garnet Bot', profit: '+۱۵٪', color: '#A855F7', status: 'غیرفعال' },
              ].map((bot) => (
                <div key={bot.name} className="flex items-center justify-between py-3 border-t"
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ background: `${bot.color}20`, color: bot.color }}>{bot.name[0]}</div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'white' }}>{bot.name}</div>
                      <div className="text-xs" style={{ color: '#94A3B8' }}>{bot.status}</div>
                    </div>
                  </div>
                  <span className="text-sm font-bold" style={{ color: '#4ADE80' }}>{bot.profit}</span>
                </div>
              ))}
            </div>

            {/* کارت شناور */}
            <motion.div
              animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 rounded-2xl p-4 flex items-center gap-3"
              style={{ background: 'rgba(15,12,41,0.9)', border: '1px solid rgba(245,158,11,0.3)', backdropFilter: 'blur(20px)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(34,197,94,0.2)' }}>💰</div>
              <div>
                <div className="text-xs" style={{ color: '#94A3B8' }}>سود دریافتی</div>
                <div className="font-bold" style={{ color: '#4ADE80' }}>+$۱۲۴.۵۰</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
