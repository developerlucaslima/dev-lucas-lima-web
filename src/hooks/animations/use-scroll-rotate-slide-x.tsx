'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRotateSlideXProps {
  duration?: number
  delay?: number
  triggerOffset?: number
  fromX?: number
  fromRotation?: number
}

export function useScrollRotateSlideX({
  duration = 2,
  delay = 0,
  triggerOffset = 100,
  fromX = 400,
  fromRotation = 180,
}: ScrollRotateSlideXProps = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: fromX, rotation: fromRotation },
        {
          opacity: 1,
          x: 0,
          duration,
          rotation: 0,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: `top bottom-=${triggerOffset}px`,
            toggleActions: 'play none none none',
          },
        },
      )
    }
  }, [duration, delay, triggerOffset, fromX])

  return ref
}
