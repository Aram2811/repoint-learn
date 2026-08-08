import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/ui/CourseCard';

async function getCourses() {
  try {
    const res = await fetch(
      `${process.env.API_URL ?? 'http://localhost:4000/api'}/courses`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* هدر صفحه */}
        <div className="bg-gradient-to-bl from-amber-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">دوره‌های آموزشی</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              مجموعه‌ای از دوره‌های تخصصی Repoint، از مقدماتی تا پیشرفته
            </p>
          </div>
        </div>

        {/* لیست دوره‌ها */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course: any) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">دوره‌ای موجود نیست</h2>
              <p className="text-gray-500">به زودی دوره‌های جدید اضافه می‌شوند</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
