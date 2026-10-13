import { Code2 } from 'lucide-react'
import Image from 'next/image'

import { AnimatedCard } from '@/components/shared/animated-card/animated-card'
import { CardContent } from '@/components/shared/card-content/card-content'
import { CardFooter } from '@/components/shared/card-footer/card-footer'
import { CardIconTitle } from '@/components/shared/card-icon-title/card-icon-title'
import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'

import { socialIcons } from './about-content.constants'
import { aboutContentStyles } from './about-content.styles'
import type { AboutContentProps } from './about-content.types'

export function AboutContent({ content, heroContent }: AboutContentProps) {
  return (
    <div className={aboutContentStyles.root}>
      <ScrollReveal className={aboutContentStyles.headingReveal}>
        <h2 className={aboutContentStyles.heading}>{content.sectionTitle}</h2>
        <div className={aboutContentStyles.headingRule} />
      </ScrollReveal>
      <div className={aboutContentStyles.contentContainer}>
        <div className={aboutContentStyles.contentRow}>
          <ScrollReveal className={aboutContentStyles.biography} fromX={-50}>
            <article>
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph} className={aboutContentStyles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </article>
          </ScrollReveal>

          <ScrollReveal className={aboutContentStyles.profile} fromX={50}>
            <div className={aboutContentStyles.profileImage}>
              <div className={aboutContentStyles.imageFrame}>
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  width={content.image.width}
                  height={content.image.height}
                />
              </div>
              <div className={aboutContentStyles.aboutCardPosition}>
                <AnimatedCard className={aboutContentStyles.aboutCard}>
                  <CardIconTitle>
                    <Code2 className={aboutContentStyles.codeIcon} size={20} />
                    <div className="uppercase">{content.aboutCard.title}</div>
                  </CardIconTitle>
                  <CardContent>
                    {heroContent.subtitles.map((subtitle) => (
                      <p key={subtitle} className={aboutContentStyles.subtitle}>
                        {subtitle}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter>
                    {content.aboutCard.links.map((link) => {
                      const Icon = socialIcons[link.iconKey]

                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.accessibleName}
                          className={aboutContentStyles.links}
                        >
                          <Icon size={20} />
                        </a>
                      )
                    })}
                  </CardFooter>
                </AnimatedCard>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
