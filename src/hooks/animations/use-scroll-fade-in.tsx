'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseScrollFadeInProps {
  duration?: number
  delay?: number
  triggerOffset?: number
}

export function useScrollFadeIn<T extends HTMLElement = HTMLDivElement>({
  duration = 0.8,
  delay = 0,
  triggerOffset = 100,
}: UseScrollFadeInProps = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const context = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        {
          opacity: 1,
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
  }, [duration, delay, triggerOffset])

  return ref
}
