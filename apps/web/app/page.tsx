import HeroSection from '@/components/home/HeroSection';
import PillarsSection from '@/components/home/PillarsSection';
import FeaturedCourseSection from '@/components/home/FeaturedCourseSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { Button, ButtonText } from '@infusethink/shared';

export default function Home() {
  return (
    <main className="min-block-screen flex flex-col">
      {/* gluestack smoke test — remove after confirming styles resolve */}
      <div className="flex justify-center p-4">
        <Button action="primary" variant="solid" size="md">
          <ButtonText>Gluestack Button</ButtonText>
        </Button>
      </div>
      <HeroSection />
      <PillarsSection />
      <FeaturedCourseSection />
      <TestimonialsSection />
    </main>
  );
}
