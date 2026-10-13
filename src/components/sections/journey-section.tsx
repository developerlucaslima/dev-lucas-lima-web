import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'
import type { JourneySectionContent } from '@/features/portfolio/content/portfolio-content.types'

import { Card, CardDescription, CardFooter, CardTitle } from '../ui/card'

interface JourneySectionProps {
  readonly content: JourneySectionContent
}

export function JourneySection({ content }: JourneySectionProps) {
  return (
    <section
      id="journey"
      className="container mx-auto flex min-h-screen max-w-3xl flex-col p-16"
    >
      <ScrollReveal className="mb-16 text-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl">
            {content.sectionTitle}
          </h2>
          <div className="bg-foreground mx-auto h-0.5 w-20" />
        </div>
      </ScrollReveal>
      <div className="relative flex flex-col gap-4">
        {/* Timeline line */}
        <div className="sm:bg-ring/30 absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 transform" />
        {content.cards.map((card, index) => (
          <div
            key={`${card.company}-${card.title}-${card.date}`}
            className={`group relative flex transition delay-50 duration-150 ease-in-out hover:-translate-y-1 hover:scale-102 ${
              index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Timeline dot */}
            <div className="sm:group-hover:bg-foreground/70 absolute top-1/2 left-1/2 z-10 flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full transition delay-50 duration-150 ease-in-out sm:bg-teal-500/30" />

            {/* Content */}
            <ScrollReveal
              fromX={index % 2 === 0 ? 40 : -40}
              delay={index * 0.15}
            >
              <a href={card.href} target="_blank" rel="noopener noreferrer">
                <Card className="group-hover:border-foreground/30 max-w-52 min-w-52 p-6">
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
            </ScrollReveal>
          </div>
        ))}
      </div>
    </section>
  )
}
