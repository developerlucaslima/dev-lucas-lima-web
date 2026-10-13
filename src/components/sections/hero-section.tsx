import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'
import type { HeroContent } from '@/features/portfolio/content/portfolio-content.types'
import { HeroIntro } from '@/features/portfolio/ui/components/hero-intro/hero-intro'

interface HeroSectionProps {
  readonly content: HeroContent
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center">
      <ScrollReveal className="mb-4" fromY={30} duration={1.5}>
        <h1 className="text-4xl font-bold uppercase transition delay-50 duration-150 ease-in-out hover:-translate-y-1 hover:scale-102 sm:text-7xl md:text-8xl">
          {content.sectionTitle}
        </h1>
      </ScrollReveal>
      <HeroIntro
        subtitles={content.subtitles}
        scrollDown={content.scrollDown}
      />
    </section>
  )
}
