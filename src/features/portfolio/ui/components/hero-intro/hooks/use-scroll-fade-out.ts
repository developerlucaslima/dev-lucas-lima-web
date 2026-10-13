'use client'

import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap } from '@/lib/animation/gsap-client'

interface UseScrollFadeOutProps {
  duration?: number
  delay?: number
  triggerOffset?: number
}

export function useScrollFadeOut<T extends HTMLElement = HTMLDivElement>({
  duration = 0.8,
  delay = 0,
  triggerOffset = 100,
}: UseScrollFadeOutProps = {}) {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return

    const context = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 1 },
        {
          opacity: 0,
          duration,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: `top bottom-=${triggerOffset}px`,
            toggleActions: 'play none none none',
          },
        },
      )
    }, ref)

    return () => context.revert()
  }, [delay, duration, prefersReducedMotion, triggerOffset])

  return ref
}
