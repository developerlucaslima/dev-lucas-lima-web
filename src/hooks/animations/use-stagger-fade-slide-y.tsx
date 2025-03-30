'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface UseStaggerFadeSlideYProps {
  triggerOffset?: number
}

export const useStaggerFadeSlideY = ({
  triggerOffset = 100,
}: UseStaggerFadeSlideYProps = {}) => {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    refs.current.forEach((ref) => {
      if (!ref) return
      gsap.fromTo(
        ref,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref,
            start: `top bottom-=${triggerOffset}px`,
            toggleActions: 'play none none none',
          },
        },
      )
    })
  }, [])

  return refs
}
