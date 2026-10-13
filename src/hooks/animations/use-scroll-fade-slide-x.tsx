'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseScrollFadeSlideXProps {
  duration?: number
  delay?: number
  triggerOffset?: number
  fromX?: number
}

export function useScrollFadeSlideX<T extends HTMLElement = HTMLDivElement>({
  duration = 1.5,
  delay = 0,
  triggerOffset = 100,
  fromX = -50,
}: UseScrollFadeSlideXProps = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const context = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: fromX },
        {
          opacity: 1,
          x: 0,
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
  }, [duration, delay, triggerOffset, fromX])

  return ref
}
