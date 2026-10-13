import { ToastProvider } from '@/components/shared/toast-provider/toast-provider'
import { ContactSection } from '@/features/contact/ui/components/contact-section/contact-section'
import { contactCopyEn } from '@/features/contact/ui/contact-copy.en'
import { getPortfolioContent } from '@/features/portfolio/content/get-portfolio-content'
import { AboutContent } from '@/features/portfolio/ui/components/about-content/about-content'
import { AboutSection } from '@/features/portfolio/ui/components/about-section/about-section'
import { HeroSection } from '@/features/portfolio/ui/components/hero-section/hero-section'
import { JourneySection } from '@/features/portfolio/ui/components/journey-section/journey-section'
import { PhilosophySection } from '@/features/portfolio/ui/components/philosophy-section/philosophy-section'
import { SpaceBackground } from '@/features/portfolio/ui/components/space-background/space-background'

export const revalidate = 86400

export default function Home() {
  const content = getPortfolioContent()

  return (
    <main className="min-h-screen max-w-screen overflow-hidden">
      <ToastProvider position="top-left" duration={7000} />
      <SpaceBackground />
      <HeroSection content={content.hero} />
      <AboutSection hardSkills={content.hardSkills}>
        <AboutContent content={content.about} heroContent={content.hero} />
      </AboutSection>
      <PhilosophySection content={content.philosophy} />
      <JourneySection content={content.journey} />
      <ContactSection copy={contactCopyEn} />
    </main>
  )
}
