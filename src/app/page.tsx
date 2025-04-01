import { AboutSection } from '@/components/sections/about-section'
import { ContactMeSection } from '@/components/sections/contact-me-section'
import { HeroSection } from '@/components/sections/hero-section'
import { JourneySection } from '@/components/sections/journey-section'
import { PhilosophySection } from '@/components/sections/philosophy-section'
import { Toaster } from '@/components/ui/sonner'
import { Background } from '@/components/ui/stars-background'

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen overflow-hidden">
      <Toaster position="top-left" duration={7000} />
      <Background />
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <JourneySection />
      <ContactMeSection />
    </main>
  )
}
