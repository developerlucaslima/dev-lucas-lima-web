import { HeroSection } from '@/components/hero-section'
import { StarBackground } from '@/components/stars-background'

export default function Home() {
  return (
    <main className="min-h-screen">
      <StarBackground />
      <HeroSection />
    </main>
  )
}
