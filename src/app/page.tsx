import { AboutSection } from '@/components/sections/about-section'
import { ContactSection } from '@/components/sections/contact-section'
import { HeroSection } from '@/components/sections/hero-section'
import { JourneySection } from '@/components/sections/journey-section'
import { PhilosophySection } from '@/components/sections/philosophy-section'
import { Background } from '@/components/ui/stars-background'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Background />
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <JourneySection />
      <ContactSection />
    </main>
  )
}
