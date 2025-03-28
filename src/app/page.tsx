import { AboutSection } from '@/components/about-section'
import { HeroSection } from '@/components/hero-section'
import { StarBackground } from '@/components/ui/stars-background'

export default function Home() {
  return (
    <main className="min-h-screen">
      <StarBackground />
      <HeroSection />
      <AboutSection />
    </main>
  )
}
