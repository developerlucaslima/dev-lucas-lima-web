'use client'

import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap } from '@/lib/animation/gsap-client'

import type { ScrollRevealProps } from '../scroll-reveal.types'

type ScrollRevealAnimation = Pick<
  ScrollRevealProps,
  'delay' | 'duration' | 'fromX' | 'fromY' | 'triggerOffset'
>

export function useScrollReveal({
  delay = 0,
  duration = 0.8,
  fromX = 0,
  fromY = 0,
  triggerOffset = 100,
}: ScrollRevealAnimation = {}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion) return

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
  }, [delay, duration, fromX, fromY, prefersReducedMotion, triggerOffset])

  return ref
}
