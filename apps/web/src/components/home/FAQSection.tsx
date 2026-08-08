'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const FAQS = [
  {
    q: 'Repoint چیست و چطور کار می‌کند؟',
    a: 'Repoint یک ربات ترید خودکار ارز دیجیتال روی بلاکچین Polygon است. ربات با استفاده از هوش مصنوعی و الگوریتم‌های پیشرفته، به صورت ۲۴/۷ معامله می‌کند و سود حاصل را به کیف پول شما واریز می‌کند. شما نیازی به دانش ترید ندارید.',
  },
  {
    q: 'سرمایه‌ام امن است؟',
    a: 'بله. سرمایه شما در کیف پول Trust Wallet خودتان قرار دارد و Repoint فقط از طریق قرارداد هوشمند (Smart Contract) روی Polygon به آن دسترسی دارد. هیچ شخص یا شرکتی نمی‌تواند مستقیماً به سرمایه شما دسترسی داشته باشد.',
  },
  {
    q: 'حداقل سرمایه برای شروع چقدر است؟',
    a: 'برای ربات Ruby حداقل ۵۰ MATIC، برای Topaz حداقل ۱۵۰ MATIC و برای Garnet حداقل ۳۰۰ MATIC نیاز دارید. توصیه می‌کنیم با Ruby شروع کنید تا با سیستم آشنا شوید.',
  },
  {
    q: 'سود چطور و کِی پرداخت می‌شود؟',
    a: '۸۰٪ از سود معاملات به صورت خودکار و مستقیم به کیف پول MATIC شما واریز می‌شود. ۲۰٪ هم به عنوان کارمزد پلتفرم کسر می‌شود. پرداخت‌ها به صورت روزانه یا هفتگی بسته به نوع ربات انجام می‌شود.',
  },
  {
    q: 'کد معرف چیست و چه فایده‌ای دارد؟',
    a: 'هر کاربر یک کد معرف منحصر به فرد دارد. وقتی با کد معرف کسی ثبت‌نام کنید، هم شما و هم معرف از مزایای ویژه بهره‌مند می‌شوید. این سیستم به رشد جامعه Repoint کمک می‌کند.',
  },
  {
    q: 'آیا می‌توانم در هر زمانی سرمایه‌ام را برداشت کنم؟',
    a: 'بله. سرمایه شما در کیف پول خودتان است و هر زمان می‌توانید آن را برداشت کنید. البته در نظر داشته باشید که با خروج از قرارداد، ربات متوقف می‌شود.',
  },
  {
    q: 'به چه ابزارهایی نیاز دارم؟',
    a: 'فقط به یک گوشی موبایل با اپ Trust Wallet نیاز دارید. سرمایه را به صورت MATIC تهیه کنید، کیف پول را به Repoint وصل کنید و ربات را انتخاب کنید. همین!',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24" style={{ background: '#0a0818' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#FCD34D', border: '1px solid rgba(245,158,11,0.3)' }}>
            سوالات متداول
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'white' }}>
            سوالی داری؟
            <span style={{ color: '#F59E0B' }}> جواب اینجاست</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${open === i ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)'}` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-right transition-colors"
                style={{ background: open === i ? 'rgba(245,158,11,0.05)' : 'rgba(255,255,255,0.02)' }}
              >
                <span className="font-semibold text-right" style={{ color: 'white' }}>{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg flex-shrink-0 mr-4"
                  style={{ color: '#F59E0B' }}
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
