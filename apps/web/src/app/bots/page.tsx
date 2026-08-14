'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShaderBackground from '@/components/ui/ShaderBackground';

const FILTERS = ['همه ربات‌ها', 'ریسک پایین', 'ریسک متوسط', 'ریسک بالاتر'];

// اطلاعات واقعی Repoint
const BOTS = [
  {
    id: 'ruby',
    name: 'Ruby Bot',
    badge: 'BEGINNER',
    badgeColor: '#ff6b6b',
    strategy: 'ریسک پایین — مناسب مبتدیان',
    color: '#ff6b6b',
    glowColor: 'rgba(255,107,107,0.15)',
    filter: 'ریسک پایین',
    icon: '🔴',
    monthlyReturn: '~۸٪',
    returnWidth: '53%',
    returnColor: '#ff6b6b',
    minEntry: '۱۰۰ دلار POL',
    maxEarning: '$۱۲,۰۰۰',
    features: [
      'کمترین سطح ریسک در Repoint',
      'سود پایدارتر ماه به ماه',
      'مناسب اولین تجربه کریپتو',
      'پشتیبانی کامل جامعه',
    ],
    desc: 'اگه تازه وارد دنیای Repoint شدی، Ruby بهترین شروع است. ریسک پایین‌تر و سود پایدار.',
    cta: 'شروع با Ruby',
    href: '/bots/ruby',
  },
  {
    id: 'topaz',
    name: 'Topaz Bot',
    badge: 'STANDARD',
    badgeColor: '#ffb68b',
    strategy: 'ریسک متوسط — محبوب‌ترین انتخاب',
    color: '#ffb68b',
    glowColor: 'rgba(255,182,139,0.15)',
    filter: 'ریسک متوسط',
    icon: '⚡',
    monthlyReturn: '۹٪',
    returnNote: 'گزارش جولای ۲۰۲۵',
    returnWidth: '60%',
    returnColor: '#ffb68b',
    minEntry: '۱۰۰ دلار POL',
    maxEarning: '$۱۲,۰۰۰',
    features: [
      'سود ۹٪ در جولای ۲۰۲۵ (واقعی)',
      'الگوریتم اختصاصی Repoint',
      'بهترین تعادل ریسک و سود',
      'محبوب‌ترین انتخاب کاربران',
    ],
    desc: 'Topaz در جولای ۲۰۲۵ واقعاً ۹٪ سود ثبت کرد. انتخاب اول اکثر کاربران Repoint.',
    cta: 'شروع با Topaz',
    href: '/bots/topaz',
    popular: true,
  },
  {
    id: 'garnet',
    name: 'Garnet Bot',
    badge: 'ADVANCED',
    badgeColor: '#d0bcff',
    strategy: 'ریسک بالاتر — برای سرمایه‌گذاران جدی',
    color: '#d0bcff',
    glowColor: 'rgba(208,188,255,0.15)',
    filter: 'ریسک بالاتر',
    icon: '💎',
    monthlyReturn: '۸.۸٪',
    returnNote: 'گزارش جولای ۲۰۲۵',
    returnWidth: '58%',
    returnColor: '#d0bcff',
    minEntry: '۱۰۰ دلار POL',
    maxEarning: '$۹۰,۰۰۰',
    features: [
      'سود ۸.۸٪ در جولای ۲۰۲۵ (واقعی)',
      'استراتژی پیشرفته‌تر',
      'سقف درآمد $۹۰,۰۰۰ (Repoint Plus)',
      'ریسک بالاتر = پتانسیل بیشتر',
    ],
    desc: 'Garnet با سقف درآمد $۹۰,۰۰۰ برای کسانی است که ریسک بیشتری می‌پذیرند.',
    cta: 'شروع با Garnet',
    href: '/bots/garnet',
  },
];

export default function BotsPage() {
  const [activeFilter, setActiveFilter] = useState('همه ربات‌ها');

  const filtered = BOTS.filter(b =>
    activeFilter === 'همه ربات‌ها' || b.filter === activeFilter
  );

  return (
    <>
      <ShaderBackground />
      <Navbar />
      <main className="min-h-screen relative z-10 pt-28 pb-24 px-4 md:px-12 max-w-screen-xl mx-auto flex flex-col gap-12">

        {/* هدر */}
        <section className="text-center md:text-right">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(to left, #d4e4fa, #ffb68b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ربات‌های هوشمند Repoint
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-2xl"
            style={{ color: '#e0c0af' }}
          >
            سه ربات با استراتژی‌های متفاوت — همه روی بلاکچین Polygon، با اشتراک مادام‌العمر ۱۰۰ دلار
          </motion.p>
        </section>

        {/* فیلتر */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 items-center pb-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-sm" style={{ color: '#6b8099' }}>دسته‌بندی:</span>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="px-4 py-1.5 rounded-full text-sm transition-all"
              style={{
                background: activeFilter === f ? 'rgba(208,188,255,0.15)' : 'rgba(18,33,49,0.6)',
                border: `1px solid ${activeFilter === f ? 'rgba(208,188,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: activeFilter === f ? '#d0bcff' : '#a0b4c8',
              }}>
              {f}
            </button>
          ))}
        </motion.div>

        {/* گرید ربات‌ها */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((bot, i) => (
            <motion.article
              key={bot.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col rounded-xl overflow-hidden group"
              style={{
                background: 'rgba(18,33,49,0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* badge محبوب */}
              {bot.popular && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded text-xs font-bold font-mono"
                  style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000' }}>
                  ⭐ محبوب‌ترین
                </div>
              )}

              {/* glow پس‌زمینه */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full -mr-20 -mt-20 blur-3xl transition-all group-hover:opacity-100 opacity-70"
                style={{ background: bot.glowColor }} />

              {/* هدر کارت */}
              <div className="relative z-10 p-6 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold" style={{ color: '#d4e4fa' }}>{bot.name}</h2>
                    <span className="text-xs font-mono px-2 py-0.5 rounded border"
                      style={{ color: bot.badgeColor, borderColor: `${bot.badgeColor}40`, background: `${bot.badgeColor}10` }}>
                      {bot.badge}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#6b8099' }}>{bot.strategy}</p>
                </div>
                <span className="text-4xl">{bot.icon}</span>
              </div>

              {/* محتوا */}
              <div className="relative z-10 px-6 pb-6 flex flex-col gap-4 flex-1">
                <p className="text-sm leading-relaxed" style={{ color: '#a0b4c8' }}>{bot.desc}</p>

                {/* ویژگی‌ها */}
                <ul className="space-y-2">
                  {bot.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#d4e4fa' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: bot.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Progress bar سود */}
                <div className="p-4 rounded-lg" style={{ background: 'rgba(13,28,45,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex justify-between text-xs mb-2">
                    <span style={{ color: '#6b8099' }}>سود ماهانه</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold font-mono" style={{ color: bot.returnColor }}>
                        {bot.monthlyReturn}
                      </span>
                      {bot.returnNote && (
                        <span style={{ color: '#3d5166', fontSize: '10px' }}>({bot.returnNote})</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(39,54,71,0.8)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: bot.returnWidth }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(to right, ${bot.color}, ${bot.color}80)` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-3">
                    <div>
                      <span style={{ color: '#6b8099' }}>حداقل ورود: </span>
                      <span style={{ color: '#bec6e0' }}>{bot.minEntry}</span>
                    </div>
                    <div>
                      <span style={{ color: '#6b8099' }}>سقف درآمد: </span>
                      <span style={{ color: '#bec6e0' }}>{bot.maxEarning}</span>
                    </div>
                  </div>
                </div>

                {/* دکمه */}
                <Link href={bot.href}
                  className="mt-auto w-full flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                  style={
                    bot.popular
                      ? { background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000' }
                      : { border: `1px solid ${bot.color}50`, color: bot.color, background: `${bot.color}08` }
                  }>
                  {bot.cta} ←
                </Link>
              </div>
            </motion.article>
          ))}
        </section>

        {/* مقایسه */}
        <section className="rounded-2xl p-8"
          style={{ background: 'rgba(13,28,45,0.7)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }}>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#d4e4fa' }}>مقایسه ربات‌ها</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th className="text-right pb-4" style={{ color: '#6b8099' }}>ویژگی</th>
                  {BOTS.map(b => (
                    <th key={b.id} className="pb-4 text-center" style={{ color: b.color }}>
                      {b.icon} {b.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                {[
                  { label: 'سطح ریسک', values: ['پایین', 'متوسط', 'بالاتر'] },
                  { label: 'سود ماهانه', values: ['~۸٪', '۹٪', '۸.۸٪'] },
                  { label: 'اشتراک', values: ['مادام‌العمر', 'مادام‌العمر', 'مادام‌العمر'] },
                  { label: 'هزینه', values: ['۱۰۰$ POL', '۱۰۰$ POL', '۱۰۰$ POL'] },
                  { label: 'سقف درآمد', values: ['$۱۲,۰۰۰', '$۱۲,۰۰۰', '$۹۰,۰۰۰'] },
                  { label: 'مناسب برای', values: ['مبتدی', 'همه سطوح', 'حرفه‌ای'] },
                ].map(row => (
                  <tr key={row.label}>
                    <td className="py-4 text-right" style={{ color: '#6b8099' }}>{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="py-4 text-center font-mono text-xs" style={{ color: '#d4e4fa' }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* disclaimer */}
        <p className="text-xs text-center" style={{ color: '#3d5166' }}>
          ⚠️ اعداد سود بر اساس گزارش‌های واقعی جولای ۲۰۲۵ است. سرمایه‌گذاری در کریپتو ریسک دارد و سود آینده تضمین‌شده نیست.
          قرارداد قابل استعلام روی Polygonscan.
        </p>

      </main>
      <Footer />
    </>
  );
}
