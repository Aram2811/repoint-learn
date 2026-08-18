'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

type Step = 'phone' | 'otp';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step !== 'otp') return;
    setTimer(120); setCanResend(false);
    const iv = setInterval(() => {
      setTimer(p => { if (p <= 1) { clearInterval(iv); setCanResend(true); return 0; } return p - 1; });
    }, 1000);
    return () => clearInterval(iv);
  }, [step]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault(); setError('');
    if (!/^09[0-9]{9}$/.test(phone)) { setError('شماره موبایل باید با 09 شروع شود و ۱۱ رقم باشد'); return; }
    setLoading(true);
    try {
      await api.post('/auth/send-otp', { phone });
      setStep('otp');
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch { setError('خطا در ارسال کد. دوباره تلاش کنید.'); }
    finally { setLoading(false); }
  }

  async function handleResend() {
    if (!canResend) return;
    setLoading(true); setError('');
    try {
      await api.post('/auth/send-otp', { phone });
      setOtp(['', '', '', '', '', '']); setTimer(120); setCanResend(false);
    } catch { setError('خطا در ارسال مجدد کد'); }
    finally { setLoading(false); }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault(); setError('');
    const code = otp.join('');
    if (code.length !== 6) return;
    setLoading(true);
    try {
      const res = await api.post<{ isNewUser: boolean }>('/auth/verify-otp', { phone, code });
      router.push(res.data.isNewUser ? '/auth/complete-profile' : '/dashboard');
    } catch {
      setError('کد وارد شده نامعتبر یا منقضی شده است');
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    }
    finally { setLoading(false); }
  }

  function handleOtpChange(i: number, v: string) {
    if (!/^\d*$/.test(v)) return;
    const n = [...otp]; n[i] = v.slice(-1); setOtp(n);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  }

  function handleOtpKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  }

  const base = { background: 'rgba(13,28,45,0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#d4e4fa' };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: '#051424' }}>
      <div className="fixed pointer-events-none" style={{ top: '-20%', left: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'rgba(255,182,139,0.05)', filter: 'blur(120px)' }} />
      <div className="fixed pointer-events-none" style={{ bottom: '-20%', right: '-10%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'rgba(208,188,255,0.1)', filter: 'blur(100px)' }} />

      <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-4 z-10">
        <div className="rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden"
          style={{ background: 'rgba(18,33,49,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }} />

          <div className="text-center">
            <Link href="/"><h1 className="text-2xl font-bold mb-1" style={{ color: '#ffb68b' }}>Repoint Bot</h1></Link>
            <p className="text-sm" style={{ color: '#a0b4c8' }}>سامانه هوشمند مدیریت ربات‌ها</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'phone' && (
              <motion.form key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <div>
                  <h2 className="font-semibold mb-1" style={{ color: '#d4e4fa' }}>ورود به سیستم</h2>
                  <p className="text-sm" style={{ color: '#a0b4c8' }}>شماره موبایل خود را وارد کنید</p>
                </div>
                <div className="relative">
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">📱</span>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="09123456789" dir="ltr" maxLength={11}
                    className="w-full rounded-lg py-3 pl-4 pr-12 outline-none font-mono transition-all" style={base}
                    onFocus={e => (e.target.style.borderColor = 'rgba(208,188,255,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>
                {error && <p className="text-xs p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full font-bold py-3 rounded-lg mt-2 disabled:opacity-50"
                  style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000' }}>
                  {loading ? '⏳ در حال ارسال...' : 'ارسال کد تأیید ←'}
                </button>
              </motion.form>
            )}

            {step === 'otp' && (
              <motion.form key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                <div>
                  <h2 className="font-semibold mb-1" style={{ color: '#d4e4fa' }}>کد تأیید</h2>
                  <p className="text-sm" style={{ color: '#a0b4c8' }}>
                    کد ارسال‌شده به <span className="font-mono" style={{ color: '#ffb68b' }} dir="ltr">{phone}</span>
                  </p>
                </div>
                <div className="flex justify-between gap-2" dir="ltr">
                  {otp.map((d, i) => (
                    <input key={i} ref={el => { otpRefs.current[i] = el; }}
                      type="text" inputMode="numeric" value={d}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)} maxLength={1}
                      className="flex-1 h-14 text-center text-xl font-bold font-mono rounded-lg outline-none transition-all"
                      style={{ ...base, border: d ? '1px solid rgba(208,188,255,0.5)' : '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(208,188,255,0.6)')}
                      onBlur={e => (e.target.style.borderColor = d ? 'rgba(208,188,255,0.5)' : 'rgba(255,255,255,0.1)')} />
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button type="button" onClick={() => { setStep('phone'); setOtp(['', '', '', '', '', '']); setError(''); }}
                    className="text-sm" style={{ color: '#a0b4c8' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ffb68b')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#a0b4c8')}>
                    ✏️ ویرایش شماره
                  </button>
                  {canResend
                    ? <button type="button" onClick={handleResend} className="text-sm font-semibold" style={{ color: '#ffb68b' }}>ارسال مجدد</button>
                    : <span className="text-sm font-mono" style={{ color: '#6b8099' }}>⏱ {fmt(timer)}</span>}
                </div>
                {error && <p className="text-xs p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}
                {loading && (
                  <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(39,54,71,0.8)' }}>
                    <div className="h-full rounded-full animate-pulse w-3/4" style={{ background: 'linear-gradient(to right, #ffb68b, #d0bcff)' }} />
                  </div>
                )}
                <button type="submit" disabled={loading || otp.join('').length !== 6}
                  className="w-full font-bold py-3 rounded-lg disabled:opacity-50"
                  style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000' }}>
                  {loading ? '⏳ در حال بررسی...' : 'تأیید و ورود'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.main>

      <footer className="absolute bottom-0 w-full py-4 text-center z-10"
        style={{ background: 'rgba(1,15,31,0.8)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-xs mb-2" style={{ color: '#3d5166' }}>© ۱۴۰۴ تمامی حقوق برای ریپوینت بات محفوظ است</p>
        <div className="flex justify-center gap-6 text-xs">
          {[{ label: 'قوانین', href: '/terms' }, { label: 'تماس', href: '/contact' }, { label: 'سوالات متداول', href: '/#faq' }].map(l => (
            <Link key={l.href} href={l.href} style={{ color: '#3d5166' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffb68b')}
              onMouseLeave={e => (e.currentTarget.style.color = '#3d5166')}>{l.label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
