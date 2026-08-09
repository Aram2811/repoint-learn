'use client';

import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'علی رضایی',
    city: 'تهران',
    avatar: '👨‍💼',
    bot: 'Topaz Bot',
    botColor: '#ffb68b',
    text: 'بعد از دیدن آموزش‌های اینجا تونستم Topaz رو راه‌اندازی کنم. ماه اول واقعاً ۹٪ سود گرفتم. آموزش‌ها خیلی واضح بودن.',
    profit: '+۹٪',
  },
  {
    name: 'مریم احمدی',
    city: 'اصفهان',
    avatar: '👩‍💻',
    bot: 'Ruby Bot',
    botColor: '#ff6b6b',
    text: 'اصلاً با کریپتو آشنا نبودم. از صفر با آموزش‌های اینجا یاد گرفتم و Ruby رو فعال کردم. خیلی ساده توضیح داده شده.',
    profit: '+۸٪',
  },
  {
    name: 'امیر محمدی',
    city: 'مشهد',
    avatar: '👨‍🔬',
    bot: 'Garnet Bot',
    botColor: '#d0bcff',
    text: 'Garnet رو انتخاب کردم چون ریسک بیشتری می‌پذیرم. ۸.۸٪ سود ماه اول — دقیقاً همون چیزی که گزارش‌ها نشون می‌دادن.',
    profit: '+۸.۸٪',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-4 md:px-12 max-w-screen-xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl font-bold" style={{ color: '#d4e4fa' }}>تجربه کاربران</h2>
        <p className="mt-2 text-sm" style={{ color: '#6b8099' }}>
          نظر کاربرانی که با آموزش‌های این سایت شروع کردن
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl p-6 flex flex-col gap-4"
            style={{
              background: 'rgba(18,33,49,0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: 'rgba(39,54,71,0.8)' }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#d4e4fa' }}>{t.name}</div>
                  <div className="text-xs" style={{ color: '#6b8099' }}>{t.city}</div>
                </div>
              </div>
              <div className="text-lg font-bold" style={{ color: '#4ADE80' }}>{t.profit}</div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: '#a0b4c8', lineHeight: 1.8 }}>
              "{t.text}"
            </p>

            <span className="text-xs font-mono px-2 py-1 rounded self-start"
              style={{ background: `${t.botColor}15`, color: t.botColor, border: `1px solid ${t.botColor}25` }}>
              {t.bot}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
