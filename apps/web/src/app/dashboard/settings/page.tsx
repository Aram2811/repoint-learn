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

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.post<User>('/auth/me')
      .then(res => {
        setUser(res.data);
        setName(res.data.name ?? '');
      })
      .catch(() => router.push('/auth/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (name.trim().length < 2) {
      setError('نام باید حداقل ۲ کاراکتر باشد');
      return;
    }
    setSaving(true);
    try {
      await api.patch('/auth/complete-profile', { name: name.trim() });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('خطایی رخ داد. دوباره تلاش کنید.');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await api.post('/auth/logout');
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#051424' }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: '#ffb68b', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const inputStyle = {
    background: 'rgba(13,28,45,0.8)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#d4e4fa',
  };

  return (
    <div className="min-h-screen" style={{ background: '#051424' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{ background: 'rgba(5,20,36,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/" className="font-bold text-lg" style={{ color: '#ffb68b' }}>Repoint Bot</Link>
        <Link href="/dashboard" className="text-sm"
          style={{ color: '#a0b4c8' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#ffb68b')}
          onMouseLeave={e => (e.currentTarget.style.color = '#a0b4c8')}>
          ← داشبورد
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto px-4 md:px-6 py-10 flex flex-col gap-6">

        {/* هدر */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">⚙️</span>
          <h1 className="text-2xl font-bold" style={{ color: '#d4e4fa' }}>تنظیمات حساب</h1>
        </div>

        {/* کارت پروفایل */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{ background: 'rgba(18,33,49,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="absolute top-0 right-0 left-0 h-px"
            style={{ background: 'linear-gradient(to left, transparent, #ffb68b60, transparent)' }} />

          <h2 className="font-semibold mb-5" style={{ color: '#d4e4fa' }}>اطلاعات شخصی</h2>

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            {/* نام */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#a0b4c8' }}>نام و نام خانوادگی</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="نام خود را وارد کنید"
                className="w-full rounded-lg py-3 px-4 outline-none transition-all"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'rgba(208,188,255,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

            {/* موبایل — فقط نمایش */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#a0b4c8' }}>شماره موبایل</label>
              <div className="w-full rounded-lg py-3 px-4 font-mono text-sm flex items-center justify-between"
                style={{ ...inputStyle, opacity: 0.6 }}>
                <span dir="ltr">{user?.phone}</span>
                <span className="text-xs px-2 py-0.5 rounded"
                  style={{ background: 'rgba(74,222,128,0.1)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.2)' }}>
                  ✓ تأیید شده
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: '#3d5166' }}>شماره موبایل قابل تغییر نیست</p>
            </div>

            {/* پیام موفقیت */}
            {success && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs p-3 rounded-lg"
                style={{ background: 'rgba(74,222,128,0.1)', color: '#4ADE80', border: '1px solid rgba(74,222,128,0.2)' }}>
                ✓ اطلاعات با موفقیت ذخیره شد
              </motion.p>
            )}

            {/* پیام خطا */}
            {error && (
              <p className="text-xs p-3 rounded-lg"
                style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </p>
            )}

            <button type="submit" disabled={saving}
              className="font-bold py-3 rounded-lg transition-all disabled:opacity-50 mt-2"
              style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000' }}>
              {saving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
            </button>
          </form>
        </motion.div>

        {/* کارت امنیت */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-6"
          style={{ background: 'rgba(18,33,49,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="font-semibold mb-4" style={{ color: '#d4e4fa' }}>امنیت حساب</h2>
          <div className="flex items-center justify-between p-4 rounded-xl"
            style={{ background: 'rgba(13,28,45,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: '#d4e4fa' }}>خروج از همه دستگاه‌ها</p>
              <p className="text-xs mt-0.5" style={{ color: '#6b8099' }}>تمام session های فعال بسته می‌شوند</p>
            </div>
            <button onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-lg transition-colors"
              style={{ border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,107,107,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              خروج
            </button>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
