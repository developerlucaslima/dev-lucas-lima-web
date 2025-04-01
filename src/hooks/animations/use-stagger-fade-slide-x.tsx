'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface StaggerFadeSlideXProps {
  triggerOffset?: number
}

export const useStaggerFadeSlideX = ({
  triggerOffset = 100,
}: StaggerFadeSlideXProps = {}) => {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    refs.current.forEach((ref, index) => {
      if (!ref) return
      const xStart = index % 2 === 0 ? -40 : 40

      gsap.fromTo(
        ref,
        { opacity: 0, x: xStart },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0,
          stagger: 0.15,
          ease: 'power1.out',
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
