'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Bookmark {
  id: string;
  lesson: {
    id: string;
    title: string;
    duration: number | null;
    section: {
      course: {
        title: string;
        slug: string;
      };
    };
  };
  createdAt: string;
}

export default function SavedPage() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Bookmark[]>('/users/me/bookmarks')
      .then(res => setBookmarks(res.data))
      .catch(() => router.push('/auth/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function removeBookmark(lessonId: string) {
    await api.post(`/lessons/${lessonId}/bookmark`);
    setBookmarks(prev => prev.filter(b => b.lesson.id !== lessonId));
  }

  function formatDuration(seconds: number | null) {
    if (!seconds) return '—';
    const m = Math.floor(seconds / 60);
    return `${m} دقیقه`;
  }

  return (
    <div className="min-h-screen" style={{ background: '#051424' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{ background: 'rgba(5,20,36,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/" className="font-bold text-lg" style={{ color: '#ffb68b' }}>Repoint Bot</Link>
        <Link href="/dashboard" className="text-sm flex items-center gap-1"
          style={{ color: '#a0b4c8' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#ffb68b')}
          onMouseLeave={e => (e.currentTarget.style.color = '#a0b4c8')}>
          ← داشبورد
        </Link>
      </nav>

      <main className="max-w-screen-xl mx-auto px-4 md:px-12 py-10">

        {/* هدر */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">🔖</span>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#d4e4fa' }}>آموزش‌های ذخیره‌شده</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6b8099' }}>
              {loading ? '...' : `${bookmarks.length} آموزش ذخیره شده`}
            </p>
          </div>
        </div>

        {/* loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 animate-spin"
              style={{ borderColor: '#ffb68b', borderTopColor: 'transparent' }} />
          </div>
        )}

        {/* خالی */}
        {!loading && bookmarks.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24 flex flex-col items-center gap-4">
            <span className="text-6xl">📭</span>
            <h2 className="text-xl font-semibold" style={{ color: '#d4e4fa' }}>هنوز آموزشی ذخیره نکردی</h2>
            <p className="text-sm" style={{ color: '#6b8099' }}>در صفحه آموزش‌ها روی 🔖 بزن تا اینجا ذخیره بشه</p>
            <Link href="/courses"
              className="inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-lg mt-2"
              style={{ background: 'linear-gradient(to right, #ffb68b, #cc6600)', color: '#2a1000' }}>
              مشاهده آموزش‌ها ←
            </Link>
          </motion.div>
        )}

        {/* لیست */}
        {!loading && bookmarks.length > 0 && (
          <div className="flex flex-col gap-3">
            {bookmarks.map((b, i) => (
              <motion.div key={b.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between gap-4 p-4 rounded-xl group"
                style={{ background: 'rgba(18,33,49,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>

                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: 'rgba(255,182,139,0.1)' }}>📹</div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate" style={{ color: '#d4e4fa' }}>
                      {b.lesson.title}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: '#6b8099' }}>
                      {b.lesson.section.course.title} · {formatDuration(b.lesson.duration)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/courses/${b.lesson.section.course.slug}`}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: 'rgba(255,182,139,0.1)', color: '#ffb68b', border: '1px solid rgba(255,182,139,0.2)' }}>
                    مشاهده
                  </Link>
                  <button onClick={() => removeBookmark(b.lesson.id)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ color: '#6b8099', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ff6b6b')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6b8099')}>
                    حذف
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
