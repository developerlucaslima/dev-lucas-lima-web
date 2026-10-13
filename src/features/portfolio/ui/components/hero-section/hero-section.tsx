import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'
import { HeroIntro } from '@/features/portfolio/ui/components/hero-intro/hero-intro'

import { heroSectionStyles } from './hero-section.styles'
import type { HeroSectionProps } from './hero-section.types'

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className={heroSectionStyles.section}>
      <ScrollReveal
        className={heroSectionStyles.titleReveal}
        fromY={30}
        duration={1.5}
      >
        <h1 className={heroSectionStyles.title}>{content.sectionTitle}</h1>
      </ScrollReveal>
      <HeroIntro
        subtitles={content.subtitles}
        scrollDown={content.scrollDown}
      />
    </section>
  )
}
