import { AboutSection } from '@/components/sections/about-section'
import { ContactMeSection } from '@/components/sections/contact-me-section'
import { HeroSection } from '@/components/sections/hero-section'
import { JourneySection } from '@/components/sections/journey-section'
import { PhilosophySection } from '@/components/sections/philosophy-section'
import { Toaster } from '@/components/ui/sonner'
import { Background } from '@/components/ui/stars-background'
import { contactCopyEn } from '@/features/contact/ui/contact-copy.en'
import { getPortfolioContent } from '@/features/portfolio/content/get-portfolio-content'
import { AboutContent } from '@/features/portfolio/ui/components/about-content/about-content'

export const revalidate = 86400

export default function Home() {
  const content = getPortfolioContent()

  return (
    <main className="min-h-screen max-w-screen overflow-hidden">
      <Toaster position="top-left" duration={7000} />
      <Background />
      <HeroSection content={content.hero} />
      <AboutSection hardSkills={content.hardSkills}>
        <AboutContent content={content.about} heroContent={content.hero} />
      </AboutSection>
      <PhilosophySection content={content.philosophy} />
      <JourneySection content={content.journey} />
      <ContactMeSection copy={contactCopyEn} />
    </main>
  )
}
