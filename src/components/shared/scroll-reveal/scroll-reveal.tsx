'use client'

import { useScrollReveal } from './hooks/use-scroll-reveal'
import type { ScrollRevealProps } from './scroll-reveal.types'

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  fromX = 0,
  fromY = 0,
  triggerOffset = 100,
}: ScrollRevealProps) {
  const ref = useScrollReveal({ delay, duration, fromX, fromY, triggerOffset })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
