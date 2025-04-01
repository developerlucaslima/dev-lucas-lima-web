'use client'

import { english } from '@/config/english-config'
import { useScrollFadeIn } from '@/hooks/animations/use-scroll-fade-in'
import { useStaggerFadeSlideY } from '@/hooks/animations/use-stagger-fade-slide-y'

import {
  AnimatedCard,
  CardContent,
  CardFooter,
  CardIconTitle,
} from '../ui/card'

export function PhilosophySection() {
  // TODO : animated fade must to be one each time
  const config = english.philosophy
  const refs = useStaggerFadeSlideY()
  const titleRef = useScrollFadeIn()

  return (
    <section
      id="philosophy"
      className="container mx-auto flex min-h-screen max-w-5xl flex-col p-16"
    >
      <div ref={titleRef} className="mb-16 text-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl">
            {config.sectionTitle}
          </h2>
          <div className="bg-foreground mx-auto h-0.5 w-20" />
        </div>
      </div>
      <div className="my-auto flex flex-wrap items-center justify-center gap-8">
        {config.cards.map((card, index) => (
          <div
            key={card.title}
            ref={(el) => {
              refs.current[index] = el
            }}
          >
            <AnimatedCard className="min-h-60">
              <CardIconTitle>
                <card.iconKey className="text-foreground mr-2" size={20} />
                <span className="text-lg font-semibold uppercase">
                  {card.title}
                </span>
              </CardIconTitle>
              <CardContent className="text-center">
                {card.description}
              </CardContent>
              <CardFooter>{card.footer}</CardFooter>
            </AnimatedCard>
          </div>
        ))}
      </div>
    </section>
  )
}
