'use client'

import { Code2 } from 'lucide-react'
import Image from 'next/image'

import { english } from '@/config/english-config'
import { useScrollFadeIn } from '@/hooks/animations/use-scroll-fade-in'
import { useScrollFadeSlideX } from '@/hooks/animations/use-scroll-fade-slide-x'

import { AnimatedCard, CardContent, CardFooter, CardIconTitle } from './ui/card'

export function AboutContent() {
  const config = english.about
  const subtitles = english.hero.subtitles
  const titleRef = useScrollFadeIn()
  const textRef = useScrollFadeSlideX({ fromX: -50 })
  const imageRef = useScrollFadeSlideX({ fromX: 50 })

  return (
    <div className="m-8 mx-auto">
      <div ref={titleRef} className="mb-16 text-center">
        <h2 className="mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl">
          {config.sectionTitle}
        </h2>
        <div className="bg-foreground mx-auto h-0.5 w-20" />
      </div>
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-wrap-reverse items-center justify-center gap-8 px-4">
          {/* Left Column */}
          <article
            ref={textRef}
            className="flex flex-1 flex-col justify-center px-4"
          >
            {config.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-muted-foreground mb-6 text-justify indent-8 text-lg leading-relaxed hyphens-none"
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* Right Column */}
          <div
            ref={imageRef}
            className="mb-32 flex h-96 flex-1 items-center justify-center"
          >
            <div className="relative h-full">
              <div className="border-ring/30 h-80 w-80 overflow-hidden rounded-full border-1">
                <Image
                  src={config.image.src}
                  alt={config.image.alt}
                  width={config.image.width}
                  height={config.image.height}
                />
              </div>
              <div className="absolute top-64 right-0">
                <AnimatedCard className="max-w-sm">
                  <CardIconTitle>
                    <Code2 className="text-foreground mr-2" size={20} />
                    <div className="uppercase">{config.aboutCard.title}</div>
                  </CardIconTitle>
                  <CardContent>
                    {subtitles.map((subtitles, index) => (
                      <p key={index} className="overflow-hidden">
                        {subtitles}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter>
                    {config.aboutCard.icons.map((icon) => (
                      <a
                        key={icon.href}
                        href={icon.href}
                        target={icon.target}
                        rel={icon.rel}
                        className="text-foreground/80 hover:text-foreground mt-4"
                      >
                        <icon.iconKey size={20} />
                      </a>
                    ))}
                  </CardFooter>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
