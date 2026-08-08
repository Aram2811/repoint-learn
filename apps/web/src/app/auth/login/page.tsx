'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

type Step = 'phone' | 'otp';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // مرحله ۱: ارسال OTP
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!/^09[0-9]{9}$/.test(phone)) {
      setError('شماره موبایل معتبر نیست');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/send-otp', { phone });
      setStep('otp');
    } catch {
      setError('خطا در ارسال کد. دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  }

  // مرحله ۲: تأیید OTP
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/verify-otp', { phone, code: otp });
      router.push('/dashboard');
    } catch {
      setError('کد وارد شده نامعتبر یا منقضی شده است');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-amber-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* لوگو */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">RP</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Repoint Learn</h1>
          <p className="text-gray-500 mt-1">ورود به حساب کاربری</p>
        </div>

        {/* کارت فرم */}
        <div className="card p-8 shadow-xl">
          <AnimatePresence mode="wait">

            {/* مرحله اول: موبایل */}
            {step === 'phone' && (
              <motion.form
                key="phone"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSendOtp}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-1">شماره موبایل</h2>
                <p className="text-gray-500 text-sm mb-6">کد تأیید به این شماره ارسال می‌شود</p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره موبایل
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09123456789"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-left ltr outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    dir="ltr"
                    maxLength={11}
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'در حال ارسال...' : 'دریافت کد تأیید'}
                </button>
              </motion.form>
            )}

            {/* مرحله دوم: OTP */}
            {step === 'otp' && (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOtp}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-1">کد تأیید</h2>
                <p className="text-gray-500 text-sm mb-6">
                  کد ۶ رقمی ارسال‌شده به{' '}
                  <span className="font-mono text-gray-700">{phone}</span>{' '}
                  را وارد کنید
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    کد تأیید
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="۱۲۳۴۵۶"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest font-mono outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    dir="ltr"
                    maxLength={6}
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                >
                  {loading ? 'در حال بررسی...' : 'ورود به حساب'}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
                  className="w-full text-center text-sm text-gray-500 hover:text-amber-500 transition-colors"
                >
                  تغییر شماره موبایل
                </button>
              </motion.form>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
