'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#010f1f', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-12 py-10 flex flex-col md:flex-row-reverse justify-between items-center gap-6">

        <div className="flex items-center gap-2">
          <span style={{ color: '#ffb68b' }}> </span>
          <span className="font-bold text-lg" style={{ color: '#ffb68b' }}>Repoint Bot</span>
        </div>

        <ul className="flex flex-wrap justify-center gap-6 text-sm">
          {[
            { label: 'آموزش‌ها', href: '/courses' },
            { label: 'سوالات متداول', href: '/#faq' },
            { label: 'تماس با ما', href: '/contact' },
            { label: 'قوانین', href: '/terms' },
          ].map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{ color: '#6b8099' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffb68b')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6b8099')}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-xs text-center" style={{ color: '#3d5166' }}>
          © ۱۴۰۴ —   سرمایه‌گذاری در کریپتو ریسک دارد
        </div>
      </div>
    </footer>
  );
}
