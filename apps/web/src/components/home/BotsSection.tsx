'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// اطلاعات واقعی از گزارش‌های مستند Repoint
const BOTS = [
  {
    id: 'ruby',
    name: 'Ruby Bot',
    icon: '📈',
    color: '#ff6b6b',
    level: 'BEGINNER',
    desc: 'ربات مبتدی Repoint با ریسک پایین‌تر. مناسب برای اولین قدم در دنیای ترید خودکار.',
    monthlyReturn: '~۸٪',
    risk: 'پایین',
    features: ['ریسک پایین‌تر', 'سود پایدار', 'مناسب مبتدیان'],
  },
  {
    id: 'topaz',
    name: 'Topaz Bot',
    icon: '⚡',
    color: '#ffb68b',
    level: 'STANDARD',
    desc: 'محبوب‌ترین ربات Repoint. در جولای ۲۰۲۵ واقعاً ۹٪ سود ثبت کرد با الگوریتم اختصاصی.',
    monthlyReturn: '۹٪ (جولای ۲۵)',
    risk: 'متوسط',
    features: ['سود واقعی مستند', 'الگوریتم اختصاصی', 'محبوب‌ترین انتخاب'],
    popular: true,
  },
  {
    id: 'garnet',
    name: 'Garnet Bot',
    icon: '💎',
    color: '#d0bcff',
    level: 'ADVANCED',
    desc: 'ربات پیشرفته Repoint. در جولای ۲۰۲۵ واقعاً ۸.۸٪ سود ثبت کرد. برای سرمایه‌گذاران جدی.',
    monthlyReturn: '۸.۸٪ (جولای ۲۵)',
    risk: 'بالاتر',
    features: ['استراتژی پیشرفته', 'سود واقعی مستند', 'ریسک بیشتر'],
  },
];

export default function BotsSection() {
  const [active, setActive] = useState('topaz');

  return (
    <section id="bots" className="px-4 md:px-12 max-w-screen-xl mx-auto w-full">

      {/* هدر — دقیقاً از Stitch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end mb-8"
      >
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#d4e4fa' }}>ربات‌های برگزیده</h2>
          <p className="mt-2 text-sm" style={{ color: '#e0c0af' }}>
            دستیاران هوشمند شما — سود واقعی بر اساس گزارش‌های مستند
          </p>
        </div>
        <a href="/courses" className="hidden md:flex items-center gap-1 text-xs"
          style={{ color: '#ffb68b' }}>
          مشاهده همه ←
        </a>
      </motion.div>

      {/* کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BOTS.map((bot, i) => (
          <motion.div
            key={bot.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActive(bot.id)}
            className="relative flex flex-col gap-4 rounded-xl p-6 cursor-pointer transition-all duration-300"
            style={{
              background: 'rgba(28,43,60,0.6)',
              backdropFilter: 'blur(12px)',
              border: active === bot.id
                ? `1px solid ${bot.color}60`
                : '1px solid rgba(255,255,255,0.1)',
              boxShadow: active === bot.id
                ? `inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px ${bot.color}15`
                : 'inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {bot.popular && (
              <div className="absolute -top-3 right-4 px-3 py-1 rounded text-xs font-bold"
                style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000', fontFamily: 'monospace' }}>
                 محبوب‌ترین
              </div>
            )}

            {/* آیکون */}
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-3xl mb-2"
              style={{ background: `${bot.color}15` }}>
              {bot.icon}
            </div>

            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg" style={{ color: '#d4e4fa' }}>{bot.name}</h3>
              <span className="text-xs px-2 py-1 rounded"
                style={{ background: 'rgba(39,54,71,0.8)', color: '#bec6e0', fontFamily: 'monospace' }}>
                {bot.level}
              </span>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: '#e0c0af' }}>{bot.desc}</p>

            <ul className="space-y-1.5">
              {bot.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: '#d4e4fa' }}>
                  <span style={{ color: bot.color }}>✓</span> {f}
                </li>
              ))}
            </ul>

            {/* آمار واقعی */}
            <div className="mt-auto rounded-lg p-4 flex justify-between"
              style={{ background: 'rgba(1,15,31,0.6)' }}>
              <div className="text-center">
                <div className="text-sm font-bold" style={{ color: bot.color }}>{bot.monthlyReturn}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6b8099' }}>سود ماهانه</div>
              </div>
              <div className="w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="text-center">
                <div className="text-sm font-bold" style={{ color: '#bec6e0' }}>{bot.risk}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6b8099' }}>سطح ریسک</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* disclaimer واقعی */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-6 p-4 rounded-xl text-center text-xs"
        style={{ background: 'rgba(255,182,139,0.04)', border: '1px solid rgba(255,182,139,0.12)', color: '#6b8099' }}
      >
        ۹۵٪ از مبالغ واریزی به قرارداد هوشمند متعلق به کاربران است · اشتراک مادام‌العمر با ۱۰۰ دلار POL ·
        قرارداد قابل استعلام روی Polygonscan ·  سرمایه‌گذاری در کریپتو ریسک دارد
      </motion.div>
    </section>
  );
}
