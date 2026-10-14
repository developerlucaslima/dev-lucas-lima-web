import { GlassCard } from '@/components/shared/glass-card/glass-card'

import { experienceCardStyles } from './experience-card.styles'
import type { ExperienceCardProps } from './experience-card.types'
export function ExperienceCard({
  content,
  detailsLabel,
  companyLinkLabel,
}: ExperienceCardProps) {
  return (
    <article aria-labelledby={`experience-${content.id}`}>
      <GlassCard className={experienceCardStyles.card}>
        <p className={experienceCardStyles.date}>{content.date}</p>
        <h3
          id={`experience-${content.id}`}
          className={experienceCardStyles.company}
        >
          {content.company}
        </h3>
        <p className={experienceCardStyles.role}>{content.title}</p>
        <p className={experienceCardStyles.summary}>{content.summary}</p>
        {content.contributions.length > 0 && (
          <details className={experienceCardStyles.details}>
            <summary className={experienceCardStyles.trigger}>
              {detailsLabel}
            </summary>
            <ul className={experienceCardStyles.contributions}>
              {content.contributions.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>
          </details>
        )}
        {content.href && (
          <a
            href={content.href}
            target="_blank"
            rel="noopener noreferrer"
            className={experienceCardStyles.link}
          >
            {companyLinkLabel} · {content.company}
          </a>
        )}
      </GlassCard>
    </article>
  )
}
