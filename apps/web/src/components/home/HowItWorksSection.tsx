'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '۱',
    icon: '📱',
    title: 'Trust Wallet نصب کن',
    desc: 'اپ Trust Wallet رو دانلود کن، کیف پول جدید بساز و شبکه Polygon (POL) رو فعال کن.',
    color: '#3B82F6',
    time: '۵ دقیقه',
  },
  {
    number: '۲',
    icon: '💰',
    title: 'POL تهیه کن',
    desc: 'معادل ۱۰۰ دلار ارز POL از صرافی‌های معتبر بخر و به کیف پول Trust Wallet انتقال بده.',
    color: '#10B981',
    time: '۱۰ دقیقه',
  },
  {
    number: '۳',
    icon: '🤝',
    title: 'با کد معرف ثبت‌نام کن',
    desc: 'وارد پلتفرم Repoint بشو، کیف پول رو وصل کن و اشتراک مادام‌العمر رو فعال کن.',
    color: '#ffb68b',
    time: '۵ دقیقه',
  },
  {
    number: '۴',
    icon: '🤖',
    title: 'ربات رو انتخاب کن',
    desc: 'بسته به سرمایه و هدفت Ruby، Topaz یا Garnet رو انتخاب کن. ربات همین الان شروع می‌کنه.',
    color: '#d0bcff',
    time: 'فوری',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-4 md:px-12 max-w-screen-xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl font-bold mb-3" style={{ color: '#d4e4fa' }}>
          از صفر تا فعال‌سازی در ۴ قدم
        </h2>
        <p className="text-sm" style={{ color: '#6b8099' }}>
          کمتر از ۲۰ دقیقه کافیه
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center gap-3 p-6 rounded-xl"
            style={{
              background: 'rgba(13,28,45,0.5)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
              {step.icon}
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: step.color, color: 'white' }}>
                {step.number}
              </div>
            </div>
            <h3 className="font-semibold text-sm" style={{ color: '#d4e4fa' }}>{step.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: '#a0b4c8' }}>{step.desc}</p>
            <span className="text-xs px-3 py-1 rounded-full mt-auto"
              style={{ background: `${step.color}15`, color: step.color }}>
              ⏱ {step.time}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
