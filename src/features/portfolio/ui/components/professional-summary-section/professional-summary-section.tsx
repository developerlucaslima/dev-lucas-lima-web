import { Card } from '@/components/shared/card/card'
import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'

import { professionalSummarySectionStyles as styles } from './professional-summary-section.styles'
import type { ProfessionalSummarySectionProps } from './professional-summary-section.types'
export function ProfessionalSummarySection({
  content,
}: ProfessionalSummarySectionProps) {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className={styles.section}
    >
      <ScrollReveal className={styles.headingReveal}>
        <h2 id="skills-heading" className={styles.heading}>
          {content.sectionTitle}
        </h2>
        <div className={styles.rule} />
      </ScrollReveal>
      <div className={styles.groups}>
        {content.groups.map((group) => (
          <ScrollReveal key={group.id}>
            <Card className={styles.card}>
              <h3 className={styles.title}>{group.title}</h3>
              <p className={styles.description}>{group.description}</p>
              <ul className={styles.technologies}>
                {group.technologies.map((technology) => (
                  <li key={technology} className={styles.technology}>
                    {technology}
                  </li>
                ))}
              </ul>
            </Card>
          </ScrollReveal>
        ))}
      </div>
      <div className={styles.educationRow}>
        <ScrollReveal>
          <Card className={styles.card}>
            <h3 className={styles.title}>{content.education.sectionTitle}</h3>
            <p>{content.education.course}</p>
            <p className={styles.description}>
              {content.education.institution}
            </p>
            <p className={styles.completion}>{content.education.completion}</p>
            <div className={styles.details}>
              <h4 className={styles.subtitle}>
                {content.education.complementary.title}
              </h4>
              <ul className={styles.list}>
                {content.education.complementary.courses.map((course) => (
                  <li key={course.id}>
                    {course.label}
                    <span className={styles.courseCompletion}>
                      {' '}
                      — {course.completion}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </ScrollReveal>
        <ScrollReveal>
          <Card className={styles.card}>
            <h3 className={styles.title}>{content.languages.title}</h3>
            <ul className={styles.list}>
              {content.languages.items.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <div className={styles.details}>
              <h4 className={styles.subtitle}>
                {content.languages.certificate.title}
              </h4>
              <p className={styles.description}>
                {content.languages.certificate.scope}
              </p>
              <p className={styles.description}>
                {content.languages.certificate.issued}
              </p>
              <a
                href={content.languages.certificate.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {content.languages.certificate.linkLabel}
              </a>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}
