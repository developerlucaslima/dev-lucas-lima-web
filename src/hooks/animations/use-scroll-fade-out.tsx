'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseScrollFadeOutProps {
  duration?: number
  delay?: number
  triggerOffset?: number
}

export function useScrollFadeOut({
  duration = 0.8,
  delay = 0,
  triggerOffset = 100,
}: UseScrollFadeOutProps = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
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
    }
  }, [duration, delay, triggerOffset])

  return ref
}
