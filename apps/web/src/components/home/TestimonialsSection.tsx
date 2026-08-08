'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const TESTIMONIALS = [
  {
    name: 'علی رضایی',
    city: 'تهران',
    avatar: '👨‍💼',
    bot: 'Topaz Bot',
    botColor: '#F59E0B',
    text: 'اول خیلی شک داشتم ولی بعد از یه ماه استفاده از Topaz، سودم رو دیدم. الان ۳ ماهه که ماهی ۱۰٪ سود می‌گیرم. آموزش‌های این سایت کمک کرد همه چیز رو درست راه‌اندازی کنم.',
    profit: '+۱۰٪',
    months: '۳ ماه',
  },
  {
    name: 'مریم احمدی',
    city: 'اصفهان',
    avatar: '👩‍💻',
    bot: 'Ruby Bot',
    botColor: '#EF4444',
    text: 'من اصلاً با کریپتو آشنا نبودم. با کمک آموزش‌های قدم‌به‌قدم این سایت تونستم Ruby رو راه‌اندازی کنم. خیلی ساده و شفاف توضیح داده بود.',
    profit: '+۷٪',
    months: '۲ ماه',
  },
  {
    name: 'امیر محمدی',
    city: 'مشهد',
    avatar: '👨‍🔬',
    bot: 'Garnet Bot',
    botColor: '#A855F7',
    text: 'Garnet برای کسایی که دنبال سود بیشتر هستن عالیه. ماهی ۱۴٪ سود می‌گیرم. فقط باید مراقب ریسکش بود که اینجا کامل توضیح داده شده.',
    profit: '+۱۴٪',
    months: '۵ ماه',
  },
  {
    name: 'سارا کریمی',
    city: 'شیراز',
    avatar: '👩‍🎓',
    bot: 'Topaz Bot',
    botColor: '#F59E0B',
    text: 'از طریق کد معرف دوستم اومدم و خوشحالم که اومدم. Topaz Bot انتخاب درستی بود. آموزش‌ها کامل و بدون پیچیدگی هستن.',
    profit: '+۱۱٪',
    months: '۴ ماه',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24" style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #0a0818 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(16,185,129,0.15)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.3)' }}>
            تجربه کاربران
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'white' }}>
            اونایی که قبلاً
            <span style={{ color: '#10B981' }}> شروع کردن </span>
            چی می‌گن؟
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: active === i ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active === i ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {/* هدر */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: 'white' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: '#94A3B8' }}>{t.city}</div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold" style={{ color: '#4ADE80' }}>{t.profit}</div>
                  <div className="text-xs" style={{ color: '#94A3B8' }}>{t.months}</div>
                </div>
              </div>

              {/* نظر */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#CBD5E1' }}>
                "{t.text}"
              </p>

              {/* ربات */}
              <span className="text-xs px-3 py-1 rounded-full"
                style={{ background: `${t.botColor}20`, color: t.botColor, border: `1px solid ${t.botColor}30` }}>
                {t.bot}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ستاره‌ها */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-2xl">⭐</span>
            ))}
          </div>
          <p className="text-sm" style={{ color: '#94A3B8' }}>
            میانگین امتیاز ۴.۸ از ۵ — بر اساس نظرات کاربران واقعی
          </p>
        </motion.div>

      </div>
    </section>
  );
}
