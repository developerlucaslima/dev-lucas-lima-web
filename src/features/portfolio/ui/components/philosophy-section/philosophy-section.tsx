import { AnimatedCard } from '@/components/shared/animated-card/animated-card'
import { CardContent } from '@/components/shared/card-content/card-content'
import { CardFooter } from '@/components/shared/card-footer/card-footer'
import { CardIconTitle } from '@/components/shared/card-icon-title/card-icon-title'
import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'

import { philosophyIcons } from './philosophy-section.constants'
import { philosophySectionStyles } from './philosophy-section.styles'
import type { PhilosophySectionProps } from './philosophy-section.types'

export function PhilosophySection({ content }: PhilosophySectionProps) {
  return (
    <section id="philosophy" className={philosophySectionStyles.section}>
      <ScrollReveal className={philosophySectionStyles.headingReveal}>
        <div className="text-center">
          <h2 className={philosophySectionStyles.heading}>
            {content.sectionTitle}
          </h2>
          <div className={philosophySectionStyles.headingRule} />
        </div>
      </ScrollReveal>
      <div className={philosophySectionStyles.cards}>
        {content.cards.map((card, index) => {
          const Icon = philosophyIcons[card.iconKey]

          return (
            <ScrollReveal
              key={card.title}
              fromX={index % 2 === 0 ? 40 : -40}
              delay={index * 0.15}
            >
              <AnimatedCard className={philosophySectionStyles.card}>
                <CardIconTitle>
                  <Icon className={philosophySectionStyles.icon} size={20} />
                  <span className={philosophySectionStyles.title}>
                    {card.title}
                  </span>
                </CardIconTitle>
                <CardContent className={philosophySectionStyles.description}>
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
