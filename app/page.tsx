import HeroSection from '@/components/home/HeroSection';
import PillarsSection from '@/components/home/PillarsSection';
import FeaturedCourseSection from '@/components/home/FeaturedCourseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function Home() {
  return (
    <main className="flex flex-col min-block-screen">
      <HeroSection />
      <PillarsSection />
      <FeaturedCourseSection />
      <TestimonialsSection />
    </main>
  );
}
