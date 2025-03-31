'use client'

import Image from 'next/image'

import { aboutConfig } from '@/config/about-config'
import { useScrollFadeIn } from '@/hooks/animations/use-scroll-fade-in'
import { useScrollFadeSlideX } from '@/hooks/animations/use-scroll-fade-slide-x'

import { AnimatedCard, CardContent, CardFooter, CardTitle } from './ui/card'

export function AboutContent() {
  const titleRef = useScrollFadeIn()
  const textRef = useScrollFadeSlideX({ fromX: -50 })
  const imageRef = useScrollFadeSlideX({ fromX: 50 })

  return (
    <div className="m-8 mx-auto">
      <div ref={titleRef} className="mb-16 text-center">
        <h2 className="mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl">
          {aboutConfig.sectionTitle}
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
            {aboutConfig.paragraphs.map((paragraph) => (
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
                  src={aboutConfig.image.src}
                  alt={aboutConfig.image.alt}
                  width={aboutConfig.image.width}
                  height={aboutConfig.image.height}
                />
              </div>
              <div className="absolute top-64 right-0">
                <AnimatedCard className="max-w-sm">
                  <CardTitle>
                    <aboutConfig.rightCard.icon
                      className="text-foreground mr-2"
                      size={20}
                    />
                    <div className="uppercase">
                      {aboutConfig.rightCard.title}
                    </div>
                  </CardTitle>
                  <CardContent>
                    {aboutConfig.rightCard.details.map((detail, index) => (
                      <p key={index} className="overflow-hidden">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter>
                    {aboutConfig.rightCard.footer.map((footer) => (
                      <a
                        key={footer.href}
                        href={footer.href}
                        target={footer.target}
                        rel={footer.rel}
                        className="text-foreground/80 hover:text-foreground mt-4"
                      >
                        <footer.icon size={20} />
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
