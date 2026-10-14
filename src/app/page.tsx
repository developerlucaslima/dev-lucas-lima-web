import { getLocale } from 'next-intl/server'

import { ToastProvider } from '@/components/shared/toast-provider/toast-provider'
import { ContactSection } from '@/features/contact/ui/components/contact-section/contact-section'
import { getLocaleContactCopy } from '@/features/contact/ui/get-locale-contact-copy'
import { getPortfolioContent } from '@/features/portfolio/content/get-portfolio-content'
import { AboutContent } from '@/features/portfolio/ui/components/about-content/about-content'
import { AboutSection } from '@/features/portfolio/ui/components/about-section/about-section'
import { HeroSection } from '@/features/portfolio/ui/components/hero-section/hero-section'
import { JourneySection } from '@/features/portfolio/ui/components/journey-section/journey-section'
import { PhilosophySection } from '@/features/portfolio/ui/components/philosophy-section/philosophy-section'
import { PortfolioNavigation } from '@/features/portfolio/ui/components/portfolio-navigation/portfolio-navigation'
import { ProductsSection } from '@/features/portfolio/ui/components/products-section/products-section'
import { ProfessionalSummarySection } from '@/features/portfolio/ui/components/professional-summary-section/professional-summary-section'
import { SpaceBackground } from '@/features/portfolio/ui/components/space-background/space-background'
import { LocaleSwitcher } from '@/i18n/locale-switcher/locale-switcher'

export const revalidate = 86400

export default async function Home() {
  const locale = await getLocale()
  const content = getPortfolioContent(locale)
  const contactCopy = getLocaleContactCopy(locale)

  return (
    <main className="min-h-screen max-w-screen overflow-hidden">
      <ToastProvider position="top-left" duration={7000} />
      <LocaleSwitcher />
      <SpaceBackground />
      <HeroSection content={content.hero} />
      <PortfolioNavigation {...content.navigation} />
      <AboutSection hardSkills={content.hardSkills}>
        <AboutContent content={content.about} heroContent={content.hero} />
      </AboutSection>
      <ProductsSection content={content.products} />
      <JourneySection content={content.journey} />
      <ProfessionalSummarySection content={content.professionalSummary} />
      <PhilosophySection content={content.philosophy} />
      <ContactSection copy={contactCopy} />
    </main>
  )
}
