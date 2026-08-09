'use client';

import { motion } from 'framer-motion';

export default function IntroSection() {
  return (
    <section className="px-4 md:px-12 max-w-screen-xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* کارت متن ۷ ستون */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center"
          style={{
            background: 'rgba(13,28,45,0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* خط نارنجی بالا — دقیقاً از Stitch */}
          <div className="absolute top-0 right-0 w-full h-1"
            style={{ background: 'linear-gradient(to left, rgba(255,182,139,0.5), transparent)' }} />

          <h2 className="text-2xl font-bold mb-4" style={{ color: '#d4e4fa' }}>
            Repoint چطور کار می‌کند؟
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: '#e0c0af', lineHeight: 1.9, fontSize: '1rem' }}>
            Repoint یک قرارداد هوشمند غیرمتمرکز روی بلاکچین Polygon است. با خرید اشتراک مادام‌العمر،
            ربات ترید شروع به کار می‌کند. تمام معاملات روی Polygonscan قابل استعلام عمومی است —
            هیچ واسطه‌ای وجود ندارد و ۹۵٪ از سود مستقیم به کیف پول Trust Wallet شما می‌رسد.
          </p>

          <div className="flex items-center gap-8 mt-auto">
            <div className="flex flex-col">
              <span className="text-2xl font-bold" style={{ color: '#ffb68b' }}>۹۵٪</span>
              <span className="text-xs mt-1" style={{ color: '#6b8099' }}>سود متعلق به کاربر</span>
            </div>
            <div className="w-px h-10" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex flex-col">
              <span className="text-2xl font-bold" style={{ color: '#d0bcff' }}>۱۰۰$</span>
              <span className="text-xs mt-1" style={{ color: '#6b8099' }}>اشتراک مادام‌العمر POL</span>
            </div>
            <div className="w-px h-10" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex flex-col">
              <span className="text-xs font-bold font-mono" style={{ color: '#bec6e0' }}>Polygonscan</span>
              <span className="text-xs mt-1" style={{ color: '#6b8099' }}>قابل استعلام عموم</span>
            </div>
          </div>
        </motion.div>

        {/* کارت AI — ۵ ستون */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-5 relative rounded-2xl overflow-hidden min-h-72 group"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {/* تصویر پس‌زمینه از Stitch */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA47EU8d7Xv1ZioPDl6PqckvjGmHkhyr5csr_OnawwrYa5lEYBK8b8d7yRmdbNPO-ybarv4fRA45jCKITnr6RYbR_uflLbPiXhs32jduQwwloc1WNoGOUrekl1X8Zoz7JaqIV8CdHtd7WeMMmRETKJ55RN5txt0UyxFz5CcQvzsv0dd0DbEC7ie7w964qaTRNXZP8TxiToeAA5TFM3tl3ODaYL-kXGF_K60BWoPeitlqPiMP8vpBVLj')`,
              opacity: 0.7,
              mixBlendMode: 'luminosity',
            }}
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(1,15,31,0.95) 0%, transparent 60%)' }} />

          <div className="absolute bottom-6 right-6 left-6">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: '#ffb68b' }}>⛓️</span>
              <span className="text-xs font-mono tracking-widest" style={{ color: '#ffb68b' }}>BLOCKCHAIN VERIFIED</span>
            </div>
            {/* AI Progress Bar */}
            <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: 'rgba(39,54,71,0.8)' }}>
              <div className="h-1.5 rounded-full animate-pulse w-3/4"
                style={{ background: 'linear-gradient(to right, #ffb68b, #d0bcff)' }} />
            </div>
            <p className="text-xs mt-2" style={{ color: '#6b8099' }}>در حال پردازش معاملات...</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
