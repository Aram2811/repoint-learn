'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// ⚠️ کد معرف خودت رو اینجا بذار
const REFERRAL_CODE = 'YOUR_CODE_HERE';
const REPOINT_URL = `https://repoint.io/register?ref=${REFERRAL_CODE}`;

export default function CTASection() {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="px-4 md:px-12 max-w-screen-xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
        style={{
          background: 'rgba(13,28,45,0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,182,139,0.2)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* خط نارنجی بالا */}
        <div className="absolute top-0 right-0 left-0 h-px"
          style={{ background: 'linear-gradient(to left, transparent, #ffb68b, transparent)' }} />

        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#d4e4fa' }}>
          آماده‌ای شروع کنی؟
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: '#e0c0af' }}>
          با کد معرف زیر اشتراک مادام‌العمر رو فعال کن. آموزش کاملاً رایگانه —
          فقط برای فعال‌سازی ربات در Repoint هزینه داری.
        </p>

        {/* کد معرف */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-3 px-6 py-4 rounded-xl"
            style={{ background: 'rgba(1,15,31,0.6)', border: '2px dashed rgba(255,182,139,0.4)' }}>
            <span className="text-sm" style={{ color: '#6b8099' }}>کد معرف:</span>
            <span className="text-xl font-bold font-mono" style={{ color: '#ffb68b' }}>
              {REFERRAL_CODE}
            </span>
            <button
              onClick={copyCode}
              className="text-xs px-3 py-1 rounded-lg transition-all"
              style={{
                background: copied ? 'rgba(34,197,94,0.2)' : 'rgba(255,182,139,0.15)',
                color: copied ? '#4ADE80' : '#ffb68b',
              }}
            >
              {copied ? '✓ کپی شد' : 'کپی'}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={REPOINT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(to right, #ffb68b, #cc6600)',
              color: '#2a1000',
              boxShadow: '0 4px 24px rgba(255,122,0,0.25)',
            }}
          >
            ثبت‌نام در Repoint با کد معرف ←
          </a>
          <a href="/courses"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg transition-colors duration-300"
            style={{ border: '1px solid #d0bcff', color: '#d0bcff' }}
          >
            ابتدا آموزش ببین
          </a>
        </div>

        {/* اطمینان‌بخش */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {[
            { icon: '🔐', text: 'سرمایه در کیف پول خودت' },
            { icon: '⛓️', text: 'قرارداد روی Polygonscan' },
            { icon: '🆓', text: 'آموزش کاملاً رایگان' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-xs" style={{ color: '#6b8099' }}>
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
