import HeroSection from '@/components/home/HeroSection';
import PillarsSection from '@/components/home/PillarsSection';
import FeaturedCourseSection from '@/components/home/FeaturedCourseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function Home() {
  return (
    <main className="min-block-screen flex flex-col">
      <HeroSection />
      <PillarsSection />
      <FeaturedCourseSection />
      <TestimonialsSection />
    </main>
  );
}
