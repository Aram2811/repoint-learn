'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const BOTS = [
  {
    id: 'ruby',
    name: 'Ruby Bot',
    emoji: '🔴',
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, #EF444420, #EF444405)',
    border: 'rgba(239,68,68,0.3)',
    level: 'مبتدی',
    desc: 'مناسب برای کسانی که تازه وارد دنیای کریپتو شدن. ریسک پایین، سود پایدار.',
    features: [
      'ریسک پایین',
      'سود ماهانه ۵ تا ۸٪',
      'مناسب برای سرمایه کم',
      'پشتیبانی کامل',
    ],
    minInvest: '۵۰ MATIC',
    monthlyReturn: '۵-۸٪',
  },
  {
    id: 'topaz',
    name: 'Topaz Bot',
    emoji: '🟡',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B20, #F59E0B05)',
    border: 'rgba(245,158,11,0.5)',
    level: 'متوسط',
    desc: 'تعادل بین ریسک و سود. برای کسانی که کمی با بازار آشنا هستن و می‌خوان بیشتر کسب کنن.',
    features: [
      'ریسک متوسط',
      'سود ماهانه ۸ تا ۱۲٪',
      'استراتژی هوشمند',
      'گزارش هفتگی',
    ],
    minInvest: '۱۵۰ MATIC',
    monthlyReturn: '۸-۱۲٪',
    popular: true,
  },
  {
    id: 'garnet',
    name: 'Garnet Bot',
    emoji: '🟣',
    color: '#A855F7',
    gradient: 'linear-gradient(135deg, #A855F720, #A855F705)',
    border: 'rgba(168,85,247,0.3)',
    level: 'پیشرفته',
    desc: 'برای سرمایه‌گذاران جدی. بیشترین سود با استراتژی‌های پیشرفته AI و تحلیل بازار.',
    features: [
      'ریسک بالاتر',
      'سود ماهانه ۱۲ تا ۱۵٪',
      'AI پیشرفته',
      'اولویت پشتیبانی',
    ],
    minInvest: '۳۰۰ MATIC',
    monthlyReturn: '۱۲-۱۵٪',
  },
];

export default function BotsSection() {
  const [activeBot, setActiveBot] = useState('topaz');

  return (
    <section className="py-24" style={{ background: 'linear-gradient(180deg, #0a0818 0%, #0f0c29 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* عنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(168,85,247,0.15)', color: '#D8B4FE', border: '1px solid rgba(168,85,247,0.3)' }}>
            ربات‌های Repoint
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'white' }}>
            سه ربات، یک هدف:
            <span style={{ color: '#A855F7' }}> سود بیشتر برای تو</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#94A3B8' }}>
            بسته به میزان سرمایه و ریسک‌پذیری‌ات، یکی از ربات‌ها رو انتخاب کن
          </p>
        </motion.div>

        {/* کارت‌های ربات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BOTS.map((bot, i) => (
            <motion.div
              key={bot.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveBot(bot.id)}
              className="rounded-2xl p-6 cursor-pointer relative transition-all duration-300"
              style={{
                background: activeBot === bot.id ? bot.gradient : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeBot === bot.id ? bot.border : 'rgba(255,255,255,0.08)'}`,
                transform: activeBot === bot.id ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {/* بج محبوب */}
              {bot.popular && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: '#F59E0B', color: 'white' }}>
                  ⭐ محبوب‌ترین
                </div>
              )}

              {/* هدر */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{bot.emoji}</div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'white' }}>{bot.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${bot.color}20`, color: bot.color }}>
                    {bot.level}
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: '#94A3B8' }}>
                {bot.desc}
              </p>

              {/* ویژگی‌ها */}
              <ul className="space-y-2 mb-6">
                {bot.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: '#CBD5E1' }}>
                    <span style={{ color: bot.color }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* اطلاعات مالی */}
              <div className="rounded-xl p-4 flex justify-between"
                style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div className="text-center">
                  <div className="text-xs mb-1" style={{ color: '#94A3B8' }}>حداقل سرمایه</div>
                  <div className="font-bold text-sm" style={{ color: bot.color }}>{bot.minInvest}</div>
                </div>
                <div className="w-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="text-center">
                  <div className="text-xs mb-1" style={{ color: '#94A3B8' }}>سود ماهانه</div>
                  <div className="font-bold text-sm" style={{ color: '#4ADE80' }}>{bot.monthlyReturn}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
