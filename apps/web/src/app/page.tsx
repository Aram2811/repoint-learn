import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShaderBackground from '@/components/ui/ShaderBackground';
import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import BotsSection from '@/components/home/BotsSection';
import CoursesPreview from '@/components/home/CoursesPreview';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import TrustSection from '@/components/home/TrustSection';

export default function HomePage() {
  return (
    <>
      <ShaderBackground />
      <Navbar />
      <main className="flex flex-col gap-24 relative z-10 pb-24">
        <HeroSection />
        <IntroSection />
        <BotsSection />
        <CoursesPreview />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}
