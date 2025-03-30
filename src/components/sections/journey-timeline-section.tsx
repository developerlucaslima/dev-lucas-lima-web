'use client'

import { experiences } from '@/config/journey-config'
import { useScrollFadeIn } from '@/hooks/animations/use-scroll-fade-in'
import { useStaggerFadeSlideX } from '@/hooks/animations/use-stagger-fade-slide-x'

import { Card, CardDescription, CardTitle } from '../ui/card'

export function TimelineJourney() {
  const items = experiences
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
            Journey Experience
          </h2>
          <div className="bg-foreground mx-auto h-0.5 w-20" />
        </div>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="bg-ring/30 absolute top-0 bottom-0 left-4 w-0.5 transform md:left-1/2 md:-translate-x-1/2" />
        {items.map((card, index) => (
          <div
            key={card.title}
            className={`group relative flex flex-col transition delay-50 duration-150 ease-in-out hover:-translate-y-1 hover:scale-102 md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline dot */}
            <div className="bg-ring/30 group-hover:bg-foreground absolute top-1/2 left-4 z-10 flex h-2 w-2 -translate-y-1/2 transform items-center justify-center rounded-full transition delay-50 duration-150 ease-in-out md:left-1/2 md:-translate-x-1/2" />

            {/* Content */}
            <Card
              ref={(el) => {
                refs.current[index] = el
              }}
              className="group-hover:border-foreground/30 min-w-52 p-6"
            >
              <CardDescription>{card.date}</CardDescription>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription className="text-primary -mt-2">
                {card.company}
              </CardDescription>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
