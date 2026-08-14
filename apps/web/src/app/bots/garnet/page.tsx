'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShaderBackground from '@/components/ui/ShaderBackground';

// این صفحه template هست — برای ruby و garnet هم کپی کن و مقادیر رو تغییر بده
const BOT = {
  name: 'Topaz Bot',
  badge: 'STANDARD',
  color: '#ffb68b',
  icon: '',
  desc: 'Topaz ربات استاندارد Repoint با بهترین تعادل بین ریسک و سود است. در جولای ۲۰۲۵ واقعاً ۹٪ سود ثبت کرد.',
  monthlyReturn: '۹٪',
  returnNote: 'گزارش جولای ۲۰۲۵',
  risk: 'متوسط',
  minEntry: '۱۰۰ دلار POL',
  maxEarning: '$۱۲,۰۰۰',
  subscription: 'مادام‌العمر',
  registerUrl: 'https://repoint.io/register?ref=YOUR_CODE',
  steps: [
    { num: '۱', title: 'Trust Wallet نصب کن', desc: 'اپ Trust Wallet دانلود کن و شبکه Polygon رو فعال کن.' },
    { num: '۲', title: 'POL تهیه کن', desc: 'معادل ۱۰۰ دلار ارز POL از صرافی معتبر بخر.' },
    { num: '۳', title: 'با کد معرف ثبت‌نام کن', desc: 'به سایت Repoint برو، کیف پول رو وصل کن و اشتراک بخر.' },
    { num: '۴', title: 'Topaz رو انتخاب کن', desc: 'ربات شروع می‌کنه و ۹۵٪ سود مستقیم به کیف پولت می‌رسه.' },
  ],
  faq: [
    { q: 'آیا اشتراک تمدید می‌خواهد؟', a: 'خیر، اشتراک مادام‌العمر است و یک‌بار پرداخت می‌شود.' },
    { q: 'سود چطور واریز می‌شود؟', a: '۹۵٪ از سود معاملات مستقیم به کیف پول Trust Wallet شما واریز می‌شود.' },
    { q: 'آیا می‌توانم ربات را تغییر دهم؟', a: 'بله، در صورت نیاز می‌توانید ربات خود را تغییر دهید.' },
  ],
};

export default function TopazDetailPage() {
  return (
    <>
      <ShaderBackground />
      <Navbar />
      <main className="min-h-screen relative z-10 pt-28 pb-24 px-4 md:px-12 max-w-screen-xl mx-auto flex flex-col gap-14">

        {/* breadcrumb */}
        <div className="flex items-center gap-2 text-sm" style={{ color: '#6b8099' }}>
          <Link href="/" onMouseEnter={e => (e.currentTarget.style.color = '#ffb68b')} onMouseLeave={e => (e.currentTarget.style.color = '#6b8099')}>خانه</Link>
          <span>/</span>
          <Link href="/bots" onMouseEnter={e => (e.currentTarget.style.color = '#ffb68b')} onMouseLeave={e => (e.currentTarget.style.color = '#6b8099')}>ربات‌ها</Link>
          <span>/</span>
          <span style={{ color: BOT.color }}>{BOT.name}</span>
        </div>

        {/* هدر */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-6xl">{BOT.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold" style={{ color: '#d4e4fa' }}>{BOT.name}</h1>
                  <span className="text-xs font-mono px-2 py-0.5 rounded border"
                    style={{ color: BOT.color, borderColor: `${BOT.color}40`, background: `${BOT.color}10` }}>
                    {BOT.badge}
                  </span>
                </div>
                <p className="text-sm mt-1" style={{ color: '#6b8099' }}>ربات Repoint روی بلاکچین Polygon</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#a0b4c8', lineHeight: 1.8 }}>
              {BOT.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={BOT.registerUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000', boxShadow: '0 4px 24px rgba(255,122,0,0.2)' }}>
                فعال‌سازی با کد معرف ←
              </a>
              <Link href="/courses"
                className="flex items-center gap-2 px-8 py-4 rounded-lg transition-colors"
                style={{ border: '1px solid rgba(208,188,255,0.35)', color: '#d0bcff' }}>
                ابتدا آموزش ببین
              </Link>
            </div>
          </motion.div>

          {/* کارت آمار */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: 'rgba(18,33,49,0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${BOT.color}25` }}>
            <div className="absolute top-0 right-0 left-0 h-px"
              style={{ background: `linear-gradient(to left, transparent, ${BOT.color}, transparent)` }} />

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'سود ماهانه', value: BOT.monthlyReturn, note: BOT.returnNote, color: BOT.color },
                { label: 'سطح ریسک', value: BOT.risk, color: '#bec6e0' },
                { label: 'هزینه ورود', value: BOT.minEntry, color: '#d4e4fa' },
                { label: 'سقف درآمد', value: BOT.maxEarning, color: '#4ADE80' },
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-xl" style={{ background: 'rgba(13,28,45,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-xs mb-1" style={{ color: '#6b8099' }}>{stat.label}</div>
                  <div className="font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
                  {stat.note && <div className="text-xs mt-0.5" style={{ color: '#3d5166' }}>{stat.note}</div>}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,182,139,0.05)', border: '1px solid rgba(255,182,139,0.15)' }}>
              <div className="flex items-start gap-2">
                <span>⛓️</span>
                <p className="text-xs leading-relaxed" style={{ color: '#a0b4c8' }}>
                  قرارداد هوشمند روی Polygon — ۹۵٪ سود برای کاربر — اشتراک {BOT.subscription} —
                  قابل استعلام روی Polygonscan
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* مراحل شروع */}
        <section>
          <h2 className="text-xl font-bold mb-8" style={{ color: '#d4e4fa' }}>چطور شروع کنم؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {BOT.steps.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl flex flex-col gap-3 items-center text-center"
                style={{ background: 'rgba(18,33,49,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{ background: `${BOT.color}20`, color: BOT.color }}>
                  {step.num}
                </div>
                <h3 className="font-semibold text-sm" style={{ color: '#d4e4fa' }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#6b8099' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#d4e4fa' }}>سوالات رایج</h2>
          <div className="space-y-3">
            {BOT.faq.map(item => (
              <div key={item.q} className="p-5 rounded-xl"
                style={{ background: 'rgba(18,33,49,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="font-semibold text-sm mb-2" style={{ color: '#d4e4fa' }}>{item.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#a0b4c8' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA نهایی */}
        <section className="text-center py-8 rounded-2xl"
          style={{ background: 'rgba(13,28,45,0.7)', border: '1px solid rgba(255,182,139,0.15)' }}>
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#d4e4fa' }}>آماده‌ای Topaz رو فعال کنی؟</h2>
          <p className="text-sm mb-6" style={{ color: '#a0b4c8' }}>آموزش کاملاً رایگان — فعال‌سازی با کد معرف</p>
          <a href={BOT.registerUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-lg transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000', boxShadow: '0 4px 32px rgba(255,122,0,0.25)' }}>
            ثبت‌نام در Repoint ←
          </a>
        </section>

      </main>
      <Footer />
    </>
  );
}
