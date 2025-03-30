'use client'

import { useRef } from 'react'

import { aboutConfig } from '@/config/about-config'
import { useStaggerFadeSlideY } from '@/hooks/animations/use-stagger-fade-slide-y'

import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'

export function PhilosophySection() {
  const philosophyRef = useRef(null)
  const cardContainerRef = useStaggerFadeSlideY({
    childSelector: '.philosophy-card',
    start: 'top 50%',
  }) as React.RefObject<HTMLDivElement>

  return (
    <section
      id="philosophy"
      ref={philosophyRef}
      className="philosophy-section container mx-auto flex min-h-screen max-w-5xl flex-col p-16"
    >
      <div className="mb-16 text-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl">
            Philosophy
          </h2>
          <div className="bg-foreground mx-auto h-0.5 w-20" />
        </div>
      </div>
      {/* Attach the hook's ref here */}
      <div
        ref={cardContainerRef}
        className="my-auto flex flex-wrap items-center justify-center gap-8"
      >
        {aboutConfig.leftCards.map((card) => (
          <Card key={card.title} className="philosophy-card min-h-60">
            <CardTitle>
              <card.icon className="text-foreground mr-2" size={20} />
              <h3 className="text-lg font-semibold uppercase">{card.title}</h3>
            </CardTitle>
            <CardContent className="text-center">{card.details}</CardContent>
            <CardFooter>{card.footer}</CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
