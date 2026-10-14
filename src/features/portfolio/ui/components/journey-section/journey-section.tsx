import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'

import { ExperienceCard } from './components/experience-card/experience-card'
import { journeySectionStyles } from './journey-section.styles'
import type { JourneySectionProps } from './journey-section.types'

export function JourneySection({ content }: JourneySectionProps) {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className={journeySectionStyles.section}
    >
      <ScrollReveal className={journeySectionStyles.headingReveal}>
        <h2 id="journey-heading" className={journeySectionStyles.heading}>
          {content.sectionTitle}
        </h2>
        <div className={journeySectionStyles.headingRule} />
      </ScrollReveal>
      <ol className={journeySectionStyles.timeline}>
        {content.cards.map((card, index) => (
          <li
            key={card.id}
            className={`${journeySectionStyles.timelineEntry} ${index % 2 === 0 ? journeySectionStyles.leftEntry : journeySectionStyles.rightEntry}`}
          >
            <span
              aria-hidden="true"
              className={journeySectionStyles.timelineDot}
            />
            <ScrollReveal
              className={journeySectionStyles.cardReveal}
              fromX={index % 2 === 0 ? -30 : 30}
            >
              <ExperienceCard
                content={card}
                detailsLabel={content.detailsLabel}
                companyLinkLabel={content.companyLinkLabel}
              />
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
