'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// سوالات واقعی از سایت repointplus.ir
const FAQS = [
  {
    q: 'هزینه ثبت‌نام و اشتراک Repoint چقدر است؟',
    a: 'برای دریافت ربات ترید و تمام خدمات Repoint، پلن ۱۰۰ دلاری در شبکه اصلی Polygon است. این اشتراک مادام‌العمر است و تمدید ندارد.',
  },
  {
    q: 'چه درصدی از سود به کاربران تعلق می‌گیرد؟',
    a: 'در این پلتفرم، ۹۵٪ از کل مبالغ واریزی به قرارداد هوشمند Repoint متعلق به کاربران است و از طریق طرح‌های درآمدزایی به آن‌ها پرداخت می‌شود.',
  },
  {
    q: 'چطور از اصالت قرارداد هوشمند مطمئن بشم؟',
    a: 'برای اطمینان از اعتبار قرارداد هوشمند می‌توانی به Polygonscan مراجعه کنی و کدهای قرارداد و مشخصات پروژه را مشاهده کنی. این شفافیت به تو امکان می‌دهد با اطمینان بیشتری وارد پروژه بشی.',
  },
  {
    q: 'برای شروع به چه ابزارهایی نیاز دارم؟',
    a: 'فقط به Trust Wallet نیاز داری. معادل ۱۰۰ دلار ارز POL (پالیگان) تهیه کن، به سایت Repoint وصل شو و اشتراک بخر. سپس اپ ربات را از Google Play نصب کن.',
  },
  {
    q: 'سقف درآمد در Repoint چقدر است؟',
    a: 'سقف درآمد در پلن Repoint معادل ۱۲٬۰۰۰ دلار و در پلن Repoint Plus معادل ۹۰٬۰۰۰ دلار است.',
  },
  {
    q: 'سیستم معرف (رفرال) چطور کار می‌کند؟',
    a: 'با معرفی هر کاربر جدید از طریق کد رفرال خودت، کمیسیون دریافت می‌کنی. همچنین سیستم استخر روزانه (باینری) وجود دارد که درآمد اضافی برایت می‌آورد.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 md:px-12 max-w-3xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl font-bold" style={{ color: '#d4e4fa' }}>سوالات متداول</h2>
        <p className="mt-2 text-sm" style={{ color: '#6b8099' }}>پاسخ سوال‌های رایج درباره Repoint</p>
      </motion.div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${open === i ? 'rgba(255,182,139,0.35)' : 'rgba(255,255,255,0.08)'}` }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-right transition-colors"
              style={{ background: open === i ? 'rgba(255,182,139,0.05)' : 'rgba(18,33,49,0.6)' }}
            >
              <span className="font-medium" style={{ color: '#d4e4fa' }}>{faq.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm flex-shrink-0 mr-4"
                style={{ color: '#ffb68b' }}
              >▼</motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#a0b4c8', lineHeight: 1.8 }}>
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
