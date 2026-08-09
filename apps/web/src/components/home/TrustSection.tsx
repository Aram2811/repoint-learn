'use client';

import { motion } from 'framer-motion';

const ITEMS = [
  { icon: '⛓️', label: 'قرارداد هوشمند روی Polygon' },
  { icon: '🔍', label: 'شفاف روی Polygonscan' },
  { icon: '🔐', label: 'سرمایه در کیف پول خودت' },
  { icon: '⚡', label: 'ترید خودکار ۲۴/۷' },
];

export default function TrustSection() {
  return (
    <section className="px-4 md:px-12 max-w-screen-xl mx-auto w-full py-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-2"
            style={{ opacity: 0.7 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
          >
            <span className="text-3xl">{item.icon}</span>
            <span className="text-xs" style={{ color: '#a0b4c8' }}>{item.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
