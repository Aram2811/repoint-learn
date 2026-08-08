'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// ⚠️ کد معرف خودت رو اینجا بذار
const REFERRAL_CODE = 'MY_CODE_HERE';
const REPOINT_REGISTER_URL = `https://repoint.io/register?ref=${REFERRAL_CODE}`;

export default function CTASection() {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #2d1500 50%, #1a0a00 100%)' }}>

      {/* پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)' }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id="ctaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F59E0B" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaGrid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#FCD34D' }}
        >
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-amber-400" />
          همین الان شروع کن — با کد معرف ویژه
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
          style={{ color: 'white' }}
        >
          آماده‌ای ربات رو
          <br />
          <span style={{ color: '#F59E0B' }}>فعال کنی؟</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: '#CBD5E1' }}
        >
          با استفاده از کد معرف زیر، اشتراک رو فعال کن و از مزایای ویژه بهره‌مند بشو.
          یادگیری کامل رایگانه — فقط برای اشتراک Repoint هزینه داری.
        </motion.p>

        {/* کد معرف */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{ background: 'rgba(245,158,11,0.1)', border: '2px dashed rgba(245,158,11,0.5)' }}>
            <span className="text-sm" style={{ color: '#94A3B8' }}>کد معرف:</span>
            <span className="text-xl font-bold tracking-widest font-mono" style={{ color: '#F59E0B' }}>
              {REFERRAL_CODE}
            </span>
            <button onClick={copyCode}
              className="text-xs px-3 py-1 rounded-lg transition-all"
              style={{ background: copied ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)', color: copied ? '#4ADE80' : '#F59E0B' }}>
              {copied ? '✓ کپی شد' : 'کپی'}
            </button>
          </div>
        </motion.div>

        {/* دکمه اصلی */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={REPOINT_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-bold px-10 py-5 rounded-2xl text-lg transition-all duration-200"
            style={{ background: '#F59E0B', color: 'white', boxShadow: '0 0 50px rgba(245,158,11,0.5)' }}
          >
            ثبت‌نام در Repoint با کد معرف
            <span>←</span>
          </a>
          <a href="/courses"
            className="inline-flex items-center justify-center gap-2 font-semibold px-10 py-5 rounded-2xl text-lg transition-all duration-200"
            style={{ border: '2px solid rgba(245,158,11,0.5)', color: '#FCD34D' }}>
            ابتدا آموزش ببین
          </a>
        </motion.div>

        {/* اطمینان‌بخش‌ها */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          {[
            { icon: '🔐', text: 'سرمایه در کیف پول خودت' },
            { icon: '⚡', text: 'شروع در کمتر از ۳۰ دقیقه' },
            { icon: '🆓', text: 'آموزش کاملاً رایگان' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm" style={{ color: '#94A3B8' }}>
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
