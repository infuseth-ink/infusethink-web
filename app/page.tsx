import HeroSection from '@/components/home/HeroSection'
import PillarsSection from '@/components/home/PillarsSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <PillarsSection />
    </main>
  )
}
