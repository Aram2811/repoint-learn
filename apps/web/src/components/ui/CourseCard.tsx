import Link from 'next/link';

interface CourseCardProps {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  thumbnailKey?: string | null;
  level: string;
  category?: { name: string } | null;
  _count?: { sections: number };
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'مقدماتی',
  intermediate: 'متوسط',
  advanced: 'پیشرفته',
};

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-red-100 text-red-700',
};

export default function CourseCard({ title, slug, description, level, category, _count }: CourseCardProps) {
  return (
    <Link href={`/courses/${slug}`}>
      <div className="card p-0 overflow-hidden group cursor-pointer h-full flex flex-col">

        {/* thumbnail */}
        <div className="h-44 bg-gradient-to-br from-amber-400 to-amber-600 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-white text-3xl font-bold">R</span>
            </div>
          </div>
          {/* hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>

        {/* محتوا */}
        <div className="p-5 flex flex-col flex-1">
          {/* badge ها */}
          <div className="flex items-center gap-2 mb-3">
            {category && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                {category.name}
              </span>
            )}
            <span className={`text-xs px-2 py-1 rounded-lg font-medium ${LEVEL_COLORS[level] ?? LEVEL_COLORS.beginner}`}>
              {LEVEL_LABELS[level] ?? level}
            </span>
          </div>

          <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
            {title}
          </h3>

          {description && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
              {description}
            </p>
          )}

          {/* footer کارت */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {_count?.sections ?? 0} فصل
            </span>
            <span className="text-amber-500 text-sm font-semibold group-hover:translate-x-[-4px] transition-transform duration-200">
              مشاهده دوره ←
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
