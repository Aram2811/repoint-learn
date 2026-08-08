'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#060412', borderTop: '1px solid rgba(245,158,11,0.15)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ background: '#F59E0B', color: 'white' }}>R</div>
              <span className="font-bold text-lg" style={{ color: 'white' }}>
                Repoint <span style={{ color: '#F59E0B' }}>Learn</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#64748B' }}>
              آموزش کامل و رایگان برای شروع کار با ربات ترید خودکار Repoint روی بلاکچین Polygon.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'white' }}>دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'آموزش‌ها', href: '/courses' },
                { label: 'مشاوره', href: '/consultation' },
                { label: 'سوالات متداول', href: '/#faq' },
                { label: 'تماس با ما', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="transition-colors"
                    style={{ color: '#64748B' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F59E0B')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'white' }}>قوانین</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'حریم خصوصی', href: '/privacy' },
                { label: 'قوانین استفاده', href: '/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="transition-colors"
                    style={{ color: '#64748B' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F59E0B')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-sm" style={{ color: '#334155' }}>
            © {new Date().getFullYear()} Repoint Learn — تمامی حقوق محفوظ است
          </p>
          <p className="text-xs" style={{ color: '#334155' }}>
            ⚠️ سرمایه‌گذاری در ارز دیجیتال ریسک دارد — با دانش کافی وارد شوید
          </p>
        </div>
      </div>
    </footer>
  );
}
