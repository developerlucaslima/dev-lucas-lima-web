import { Card } from '@/components/shared/card/card'
import { CardDescription } from '@/components/shared/card-description/card-description'
import { CardFooter } from '@/components/shared/card-footer/card-footer'
import { CardTitle } from '@/components/shared/card-title/card-title'
import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'

import { journeySectionStyles } from './journey-section.styles'
import type { JourneySectionProps } from './journey-section.types'

export function JourneySection({ content }: JourneySectionProps) {
  return (
    <section id="journey" className={journeySectionStyles.section}>
      <ScrollReveal className={journeySectionStyles.headingReveal}>
        <div className="text-center">
          <h2 className={journeySectionStyles.heading}>
            {content.sectionTitle}
          </h2>
          <div className={journeySectionStyles.headingRule} />
        </div>
      </ScrollReveal>
      <div className={journeySectionStyles.timeline}>
        {/* Timeline line */}
        <div className={journeySectionStyles.timelineLine} />
        {content.cards.map((card, index) => (
          <div
            key={`${card.company}-${card.title}-${card.date}`}
            className={`${journeySectionStyles.timelineEntry} ${
              index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Timeline dot */}
            <div className={journeySectionStyles.timelineDot} />

            {/* Content */}
            <ScrollReveal
              fromX={index % 2 === 0 ? 40 : -40}
              delay={index * 0.15}
            >
              <a href={card.href} target="_blank" rel="noopener noreferrer">
                <Card className={journeySectionStyles.card}>
                  <CardTitle className="overflow-ellipsis uppercase">
                    {card.title}
                  </CardTitle>
                  <CardDescription className={journeySectionStyles.company}>
                    {card.company}
                  </CardDescription>
                  <CardFooter className={journeySectionStyles.date}>
                    {card.date}
                  </CardFooter>
                </Card>
              </a>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </section>
  )
}
