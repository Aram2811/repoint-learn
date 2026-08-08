'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '۱',
    icon: '📱',
    title: 'Trust Wallet نصب کن',
    desc: 'اپ Trust Wallet رو از App Store یا Google Play دانلود و نصب کن. یه کیف پول جدید بساز و seed phrase رو در جای امن نگه دار.',
    color: '#3B82F6',
    duration: '۵ دقیقه',
  },
  {
    number: '۲',
    icon: '💜',
    title: 'شبکه Polygon رو اضافه کن',
    desc: 'داخل Trust Wallet، شبکه Polygon (MATIC) رو فعال کن. این شبکه‌ای هست که Repoint روش کار می‌کنه.',
    color: '#A855F7',
    duration: '۲ دقیقه',
  },
  {
    number: '۳',
    icon: '💰',
    title: 'MATIC بخر',
    desc: 'از صرافی‌های معتبر مثل Nobitex یا Wallex ارز MATIC بخر و به کیف پول Trust Wallet‌ات انتقال بده.',
    color: '#10B981',
    duration: '۱۰ دقیقه',
  },
  {
    number: '۴',
    icon: '🤝',
    title: 'ثبت‌نام با کد معرف',
    desc: 'وارد پلتفرم Repoint بشو، کیف پول رو وصل کن و با کد معرف اشتراک بخر تا از مزایای ویژه بهره‌مند بشی.',
    color: '#F59E0B',
    duration: '۵ دقیقه',
  },
  {
    number: '۵',
    icon: '🤖',
    title: 'ربات رو انتخاب کن',
    desc: 'بسته به سرمایه‌ات Ruby، Topaz یا Garnet رو انتخاب کن. ربات شروع به کار می‌کنه و سود به کیف پولت واریز می‌شه.',
    color: '#EF4444',
    duration: 'فوری',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24" style={{ background: '#0a0818' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* عنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(59,130,246,0.15)', color: '#93C5FD', border: '1px solid rgba(59,130,246,0.3)' }}>
            شروع کار
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'white' }}>
            از صفر تا
            <span style={{ color: '#F59E0B' }}> درآمد دلاری </span>
            در ۵ قدم
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#94A3B8' }}>
            فقط ۲۲ دقیقه وقت لازم داری تا ربات رو راه‌اندازی کنی
          </p>
        </motion.div>

        {/* مراحل */}
        <div className="relative">
          {/* خط اتصال */}
          <div className="hidden lg:block absolute top-16 right-0 left-0 h-0.5 mx-32"
            style={{ background: 'linear-gradient(90deg, #3B82F620, #F59E0B40, #EF444420)' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                {/* آیکون */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4 z-10"
                  style={{
                    background: `${step.color}20`,
                    border: `2px solid ${step.color}40`,
                  }}
                >
                  {step.icon}
                  {/* شماره */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: step.color, color: 'white' }}>
                    {step.number}
                  </div>
                </motion.div>

                <h3 className="font-bold mb-2 text-sm" style={{ color: 'white' }}>
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#94A3B8' }}>
                  {step.desc}
                </p>
                <span className="text-xs px-2 py-1 rounded-full"
                  style={{ background: `${step.color}15`, color: step.color }}>
                  ⏱ {step.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* دکمه */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-14"
        >
          <a href="/courses"
            className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-xl transition-all duration-200"
            style={{ background: '#F59E0B', color: 'white', boxShadow: '0 0 40px rgba(245,158,11,0.3)' }}>
            آموزش کامل رایگان رو ببین ←
          </a>
        </motion.div>

      </div>
    </section>
  );
}
