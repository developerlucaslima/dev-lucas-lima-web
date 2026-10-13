import { Clock, Clover, HandHelping, SmilePlus } from 'lucide-react'

import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'
import type {
  PhilosophyIconKey,
  PhilosophySectionContent,
} from '@/features/portfolio/content/portfolio-content.types'

import {
  AnimatedCard,
  CardContent,
  CardFooter,
  CardIconTitle,
} from '../ui/card'

const philosophyIcons = {
  clock: Clock,
  clover: Clover,
  handHelping: HandHelping,
  smilePlus: SmilePlus,
} satisfies Record<PhilosophyIconKey, typeof Clock>

interface PhilosophySectionProps {
  readonly content: PhilosophySectionContent
}

export function PhilosophySection({ content }: PhilosophySectionProps) {
  return (
    <section
      id="philosophy"
      className="container mx-auto flex min-h-screen max-w-5xl flex-col p-16"
    >
      <ScrollReveal className="mb-16 text-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl">
            {content.sectionTitle}
          </h2>
          <div className="bg-foreground mx-auto h-0.5 w-20" />
        </div>
      </ScrollReveal>
      <div className="my-auto flex flex-wrap items-center justify-center gap-8">
        {content.cards.map((card, index) => {
          const Icon = philosophyIcons[card.iconKey]

          return (
            <ScrollReveal
              key={card.title}
              fromX={index % 2 === 0 ? 40 : -40}
              delay={index * 0.15}
            >
              <AnimatedCard className="min-h-60">
                <CardIconTitle>
                  <Icon className="text-foreground mr-2" size={20} />
                  <span className="text-lg font-semibold uppercase">
                    {card.title}
                  </span>
                </CardIconTitle>
                <CardContent className="text-center">
                  {card.description}
                </CardContent>
                <CardFooter>{card.footer}</CardFooter>
              </AnimatedCard>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
