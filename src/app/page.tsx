import { AboutSection } from '@/components/sections/about-section'
import { HeroSection } from '@/components/sections/hero-section'
import { TimelineJourney } from '@/components/sections/journey-timeline-section'
import { PhilosophySection } from '@/components/sections/philosophy-section'
import { Background } from '@/components/ui/stars-background'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Background />
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <TimelineJourney />
    </main>
  )
}
