'use client';

import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: '🤖',
    title: 'ترید کاملاً خودکار',
    desc: 'ربات ۲۴ ساعت شبانه‌روز و ۷ روز هفته بدون نیاز به حضور تو معامله می‌کنه. نه نیاز به دانش تکنیکال، نه نیاز به رصد بازار.',
    color: '#F59E0B',
  },
  {
    icon: '🔐',
    title: 'امنیت بلاکچین',
    desc: 'تمام قراردادها روی بلاکچین Polygon ثبت می‌شن. سرمایه‌ات در کیف پول خودته و هیچ‌کس به اون دسترسی نداره.',
    color: '#A855F7',
  },
  {
    icon: '💎',
    title: '۳ ربات برای هر سطح',
    desc: 'Ruby برای مبتدیان، Topaz برای میانی و Garnet برای حرفه‌ای‌ها. هر ربات ریسک و سود متفاوتی داره.',
    color: '#EF4444',
  },
  {
    icon: '📈',
    title: '۸۰٪ سود برای کاربر',
    desc: 'از هر سودی که ربات می‌سازه، ۸۰٪ مستقیم به کیف پول تو واریز می‌شه. شفاف و بدون واسطه.',
    color: '#10B981',
  },
  {
    icon: '👥',
    title: 'سیستم معرف پرسود',
    desc: 'با معرفی دوستانت کد رفرال خودت رو به اشتراک بذار و از هر اشتراک اونا کمیسیون بگیر.',
    color: '#3B82F6',
  },
  {
    icon: '📱',
    title: 'مدیریت با Trust Wallet',
    desc: 'فقط به Trust Wallet نیاز داری. کیف پول رو وصل کن و با MATIC اشتراک بخر — همین.',
    color: '#F59E0B',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section className="py-24" style={{ background: '#0a0818' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* عنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#FCD34D', border: '1px solid rgba(245,158,11,0.3)' }}>
            چرا Repoint؟
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'white' }}>
            ساده‌ترین راه برای
            <span style={{ color: '#F59E0B' }}> درآمد دلاری </span>
            از کریپتو
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#94A3B8' }}>
            بدون نیاز به تجربه، بدون نیاز به رصد بازار — فقط یه بار تنظیم کن و بذار ربات کارش رو بکنه
          </p>
        </motion.div>

        {/* گرید ویژگی‌ها */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-2xl p-6 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${feature.color}20` }}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'white' }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
