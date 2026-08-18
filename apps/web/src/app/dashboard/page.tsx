'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface User {
  id: string;
  phone: string;
  name: string | null;
  isVerified: boolean;
}

const QUICK_LINKS = [
  { icon: '📚', label: 'آموزش‌ها', href: '/courses', color: '#ffb68b' },
  { icon: '🤖', label: 'ربات‌ها', href: '/bots', color: '#d0bcff' },
  { icon: '💬', label: 'مشاوره', href: '/consultation', color: '#bec6e0' },
  { icon: '⚙️', label: 'تنظیمات', href: '/dashboard/settings', color: '#a0b4c8' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.post<User>('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => router.push('/auth/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await api.post('/auth/logout');
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#051424' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#ffb68b', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'صبح بخیر';
    if (h < 17) return 'عصر بخیر';
    return 'شب بخیر';
  };

  return (
    <div className="min-h-screen" style={{ background: '#051424' }}>

      {/* Navbar داشبورد */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{ background: 'rgba(5,20,36,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/" className="font-bold text-lg" style={{ color: '#ffb68b' }}>
          Repoint Bot
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden md:block" style={{ color: '#a0b4c8' }}>
            {user?.name ?? user?.phone}
          </span>
          <button onClick={handleLogout}
            className="text-xs px-3 py-1.5 rounded-lg transition-colors"
            style={{ border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,107,107,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            خروج
          </button>
        </div>
      </nav>

      <main className="max-w-screen-xl mx-auto px-4 md:px-12 py-10 flex flex-col gap-8">

        {/* خوش‌آمدگویی */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-2xl p-8 relative overflow-hidden"
            style={{ background: 'rgba(18,33,49,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="absolute top-0 right-0 left-0 h-px"
              style={{ background: 'linear-gradient(to left, transparent, #ffb68b60, transparent)' }} />
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(255,182,139,0.06)', transform: 'translate(-30%, -30%)' }} />

            <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(255,182,139,0.1)', border: '1px solid rgba(255,182,139,0.2)' }}>
                👤
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: '#a0b4c8' }}>{greeting()},</p>
                <h1 className="text-2xl font-bold" style={{ color: '#d4e4fa' }}>
                  {user?.name ?? 'کاربر عزیز'} 👋
                </h1>
                <p className="text-sm mt-1 font-mono" style={{ color: '#6b8099' }}>{user?.phone}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* دسترسی سریع */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-base font-semibold mb-4" style={{ color: '#a0b4c8' }}>دسترسی سریع</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_LINKS.map((link, i) => (
              <motion.div key={link.href}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}>
                <Link href={link.href}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl text-center group transition-all duration-200"
                  style={{ background: 'rgba(18,33,49,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${link.color}40`;
                    (e.currentTarget as HTMLElement).style.background = `${link.color}08`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(18,33,49,0.6)';
                  }}>
                  <span className="text-3xl">{link.icon}</span>
                  <span className="text-sm font-medium" style={{ color: '#d4e4fa' }}>{link.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* آمار کاربر */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-base font-semibold mb-4" style={{ color: '#a0b4c8' }}>خلاصه فعالیت</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'آموزش‌های ذخیره‌شده', value: '—', icon: '🔖', href: '/dashboard/saved', color: '#ffb68b' },
              { label: 'آموزش‌های تکمیل‌شده', value: '—', icon: '✅', href: '/dashboard/history', color: '#4ADE80' },
              { label: 'درخواست‌های مشاوره', value: '—', icon: '💬', href: '/dashboard/consultations', color: '#d0bcff' },
            ].map((stat, i) => (
              <Link key={stat.label} href={stat.href}
                className="flex items-center gap-4 p-5 rounded-xl group transition-all duration-200"
                style={{ background: 'rgba(18,33,49,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = `${stat.color}40`)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)')}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${stat.color}12` }}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#6b8099' }}>{stat.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* راهنمای شروع */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="rounded-2xl p-6 flex flex-col md:flex-row-reverse items-center gap-6"
            style={{ background: 'rgba(255,182,139,0.05)', border: '1px solid rgba(255,182,139,0.15)' }}>
            <span className="text-5xl">🚀</span>
            <div className="flex-1 text-right">
              <h3 className="font-bold text-lg mb-2" style={{ color: '#d4e4fa' }}>
                آماده شروع یادگیری هستی؟
              </h3>
              <p className="text-sm mb-4" style={{ color: '#a0b4c8' }}>
                همه آموزش‌های راه‌اندازی Repoint از صفر رایگان است. همین الان شروع کن.
              </p>
              <Link href="/courses"
                className="inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-lg"
                style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000' }}>
                مشاهده آموزش‌ها ←
              </Link>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
