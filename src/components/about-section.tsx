'use client'

import Image from 'next/image'

import { aboutConfig } from '@/config/about-config'
import { useScrollFadeIn } from '@/hooks/animations/use-scroll-fade-in'
import { useScrollFadeSlideX } from '@/hooks/animations/use-scroll-fade-slide-x'

import { InfoCard } from './ui/info-card'

export function AboutSection() {
  const titleRef = useScrollFadeIn()
  const textRef = useScrollFadeSlideX({ fromX: -50 })
  const imageRef = useScrollFadeSlideX({ fromX: 50 })

  return (
    <section
      id="about"
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <div className="container mx-auto max-w-5xl">
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold uppercase md:text-5xl">
            {aboutConfig.sectionTitle}
          </h2>
          <div className="bg-foreground mx-auto h-1 w-20" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div ref={textRef} className="flex flex-col justify-center px-4">
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              {aboutConfig.firstParagraph}
            </p>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              {aboutConfig.secondParagraph}
            </p>
            <div className="grid grid-cols-2 gap-4 overflow-auto">
              {aboutConfig.leftCards.map((card) => (
                <InfoCard
                  key={card.title}
                  Icon={card.icon}
                  title={card.title}
                  details={card.details}
                  footer={card.footer?.map((footer) => (
                    <a
                      key={footer.href}
                      href={footer.href}
                      target={footer.target}
                      rel={footer.rel}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <footer.icon size={20} />
                    </a>
                  ))}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div
            ref={imageRef}
            className="flex h-full flex-1 items-center justify-center"
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
                <InfoCard
                  Icon={aboutConfig.rightCard.icon}
                  title={aboutConfig.rightCard.title}
                  details={aboutConfig.rightCard.details}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
