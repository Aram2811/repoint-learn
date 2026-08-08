'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'خانه', href: '/' },
  { label: 'آموزش‌ها', href: '/courses' },
  { label: 'ربات‌ها', href: '/#bots' },
  { label: 'مشاوره', href: '/consultation' },
  { label: 'سوالات', href: '/#faq' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ background: 'rgba(15,12,41,0.85)', borderColor: 'rgba(245,158,11,0.15)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{ background: '#F59E0B', color: 'white' }}>R</div>
            <span className="font-bold text-lg" style={{ color: 'white' }}>
              Repoint <span style={{ color: '#F59E0B' }}>Learn</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: '#94A3B8' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F59E0B')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login"
              className="text-sm font-semibold px-4 py-2 rounded-xl transition-all"
              style={{ border: '1px solid rgba(245,158,11,0.4)', color: '#FCD34D' }}>
              ورود
            </Link>
            <Link href="/courses"
              className="text-sm font-bold px-4 py-2 rounded-xl transition-all"
              style={{ background: '#F59E0B', color: 'white' }}>
              شروع رایگان
            </Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg" style={{ color: '#94A3B8' }}>
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t" style={{ borderColor: 'rgba(245,158,11,0.15)', background: 'rgba(15,12,41,0.98)' }}>
            <div className="px-4 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className="py-2 font-medium" style={{ color: '#CBD5E1' }}>
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <Link href="/auth/login" className="text-center py-3 rounded-xl font-semibold"
                  style={{ border: '1px solid rgba(245,158,11,0.4)', color: '#FCD34D' }}>ورود</Link>
                <Link href="/courses" className="text-center py-3 rounded-xl font-bold"
                  style={{ background: '#F59E0B', color: 'white' }}>شروع رایگان</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
