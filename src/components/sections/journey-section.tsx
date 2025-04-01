'use client'

import { english } from '@/config/english-config'
import { useScrollFadeIn } from '@/hooks/animations/use-scroll-fade-in'
import { useStaggerFadeSlideX } from '@/hooks/animations/use-stagger-fade-slide-x'

import { Card, CardDescription, CardFooter, CardTitle } from '../ui/card'

export function JourneySection() {
  const config = english.journey
  const refs = useStaggerFadeSlideX()
  const titleRef = useScrollFadeIn()

  return (
    <section
      id="journey"
      className="container mx-auto flex min-h-screen max-w-3xl flex-col p-16"
    >
      <div ref={titleRef} className="mb-16 text-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl">
            {config.sectionTitle}
          </h2>
          <div className="bg-foreground mx-auto h-0.5 w-20" />
        </div>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="sm:bg-ring/30 absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 transform" />
        {config.cards.map((card, index) => (
          <div
            key={index}
            className={`group relative flex transition delay-50 duration-150 ease-in-out hover:-translate-y-1 hover:scale-102 ${
              index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Timeline dot */}
            <div className="sm:group-hover:bg-foreground/70 absolute top-1/2 left-1/2 z-10 flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full transition delay-50 duration-150 ease-in-out sm:bg-teal-500/30" />

            {/* Content */}
            <a href={card.href} target={'_blank'} rel={'noopener noreferrer'}>
              <Card
                ref={(el) => {
                  refs.current[index] = el
                }}
                className="group-hover:border-foreground/30 max-w-52 min-w-52 p-6"
              >
                <CardTitle className="overflow-ellipsis uppercase">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-foreground/80 -mt-2">
                  {card.company}
                </CardDescription>
                <CardFooter className="text-foreground/80 text-sm">
                  {card.date}
                </CardFooter>
              </Card>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
