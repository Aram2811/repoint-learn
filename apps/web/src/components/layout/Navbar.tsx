'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'خانه', href: '/' },
  { label: 'آموزش‌ها', href: '/courses' },
  { label: 'ربات‌ها', href: '/#bots' },
  { label: 'درباره ما', href: '/about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 w-full z-50 flex flex-row-reverse justify-between items-center px-6 md:px-12 h-20"
      style={{
        background: 'rgba(5,20,36,0.8)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* لوگو */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-3xl" style={{ color: '#ffb68b' }}>🤖</span>
        <span className="font-bold text-lg" style={{ color: '#ffb68b' }}>Repoint Bot</span>
      </Link>

      {/* لینک‌های دسکتاپ */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm transition-colors duration-300"
              style={{ color: '#e0c0af', fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffb68b')}
              onMouseLeave={e => (e.currentTarget.style.color = '#e0c0af')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="hidden md:block">
        <Link
          href="/auth/login"
          className="flex items-center gap-2 text-sm px-6 py-2 rounded-full transition-colors duration-300"
          style={{
            color: '#ffb68b',
            background: 'rgba(18,33,49,0.8)',
            border: '1px solid rgba(255,182,139,0.3)',
          }}
        >
          ورود / ثبت‌نام
        </Link>
      </div>

      {/* موبایل */}
      <button onClick={() => setOpen(!open)} className="md:hidden p-2" style={{ color: '#e0c0af' }}>
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`block h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 bg-current ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 right-0 md:hidden border-t"
            style={{ background: 'rgba(5,20,36,0.98)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                  className="py-2 text-sm" style={{ color: '#d4e4fa' }}>{link.label}</Link>
              ))}
              <Link href="/auth/login"
                className="text-center py-3 rounded-full text-sm"
                style={{ border: '1px solid rgba(255,182,139,0.3)', color: '#ffb68b' }}>
                ورود / ثبت‌نام
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
