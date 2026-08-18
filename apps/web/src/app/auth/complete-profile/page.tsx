'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function CompleteProfilePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) { setError('لطفاً نام کامل خود را وارد کنید'); return; }
    setLoading(true);
    try {
      await api.patch('/auth/complete-profile', { name: name.trim() });
      router.push('/dashboard');
    } catch { setError('خطایی رخ داد. دوباره تلاش کنید.'); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#051424' }}>
      <div className="fixed pointer-events-none" style={{ top: '-10%', right: '-10%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'rgba(255,182,139,0.06)', filter: 'blur(100px)' }} />
      <div className="fixed pointer-events-none" style={{ bottom: '-10%', left: '-10%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'rgba(208,188,255,0.08)', filter: 'blur(100px)' }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
        <div className="rounded-2xl p-8 relative overflow-hidden"
          style={{ background: 'rgba(18,33,49,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }} />

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
              style={{ background: 'rgba(255,182,139,0.1)', border: '1px solid rgba(255,182,139,0.2)' }}>👤</div>
            <h1 className="text-xl font-bold mb-1" style={{ color: '#d4e4fa' }}>تکمیل پروفایل</h1>
            <p className="text-sm" style={{ color: '#a0b4c8' }}>برای شروع، لطفاً نام خود را وارد کنید</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-2" style={{ color: '#a0b4c8' }}>نام و نام خانوادگی</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="مثال: علی رضایی" autoFocus
                className="w-full rounded-lg py-3 px-4 outline-none transition-all"
                style={{ background: 'rgba(13,28,45,0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#d4e4fa' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(208,188,255,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </div>
            {error && <p className="text-xs p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}
            <button type="submit" disabled={loading || name.trim().length < 2}
              className="w-full font-bold py-3 rounded-lg mt-2 transition-all disabled:opacity-50"
              style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000' }}>
              {loading ? 'در حال ذخیره...' : 'ورود به داشبورد ←'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
