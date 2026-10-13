import { Code2, Github, Linkedin } from 'lucide-react'
import Image from 'next/image'

import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'
import {
  AnimatedCard,
  CardContent,
  CardFooter,
  CardIconTitle,
} from '@/components/ui/card'
import type {
  AboutSectionContent,
  HeroContent,
} from '@/features/portfolio/content/portfolio-content.types'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
} as const

interface AboutContentProps {
  readonly content: AboutSectionContent
  readonly heroContent: HeroContent
}

export function AboutContent({ content, heroContent }: AboutContentProps) {
  return (
    <div className="m-8 mx-auto">
      <ScrollReveal className="mb-16 text-center">
        <h2 className="mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl">
          {content.sectionTitle}
        </h2>
        <div className="bg-foreground mx-auto h-0.5 w-20" />
      </ScrollReveal>
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-wrap-reverse items-center justify-center gap-8 px-4">
          <ScrollReveal
            className="flex flex-1 flex-col justify-center px-4"
            fromX={-50}
          >
            <article>
              {content.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-muted-foreground mb-6 text-justify indent-8 text-lg leading-relaxed hyphens-none"
                >
                  {paragraph}
                </p>
              ))}
            </article>
          </ScrollReveal>

          <ScrollReveal
            className="mb-32 flex h-96 flex-1 items-center justify-center"
            fromX={50}
          >
            <div className="relative h-full">
              <div className="border-ring/30 h-80 w-80 overflow-hidden rounded-full border-1">
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  width={content.image.width}
                  height={content.image.height}
                />
              </div>
              <div className="absolute top-64 right-0">
                <AnimatedCard className="max-w-sm">
                  <CardIconTitle>
                    <Code2 className="text-foreground mr-2" size={20} />
                    <div className="uppercase">{content.aboutCard.title}</div>
                  </CardIconTitle>
                  <CardContent>
                    {heroContent.subtitles.map((subtitle) => (
                      <p key={subtitle} className="overflow-hidden">
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
                          className="text-foreground/80 hover:text-foreground mt-4"
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
