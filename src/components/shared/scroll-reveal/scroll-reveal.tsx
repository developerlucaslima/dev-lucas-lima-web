'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

import type { ScrollRevealProps } from './scroll-reveal.types'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  fromX = 0,
  fromY = 0,
  triggerOffset = 100,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, x: fromX, y: fromY },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          scrollTrigger: {
            trigger: element,
            start: `top bottom-=${triggerOffset}px`,
            toggleActions: 'play none none none',
          },
        },
      )
    }, element)

    return () => context.revert()
  }, [delay, duration, fromX, fromY, triggerOffset])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
