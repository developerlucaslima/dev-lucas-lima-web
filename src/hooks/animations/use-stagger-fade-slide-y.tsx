'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export interface UseStaggerFadeSlideYProps {
  childSelector: string
  duration?: number
  stagger?: number
  fromY?: number
  toY?: number
  initialOpacity?: number
  finalOpacity?: number
  triggerOffset?: number
  start?: string
  ease?: string
}

export const useStaggerFadeSlideY = ({
  childSelector,
  duration = 0.8,
  stagger = 0.2,
  fromY = 30,
  toY = 0,
  initialOpacity = 0,
  finalOpacity = 1,
  triggerOffset = 100,
  start = 'top 80%',
  ease = 'power2.out',
}: UseStaggerFadeSlideYProps) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const children = ref.current.querySelectorAll(childSelector)
    if (!children.length) return

    gsap.fromTo(
      children,
      { opacity: initialOpacity, y: fromY },
      {
        opacity: finalOpacity,
        y: toY,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start: `top bottom-=${triggerOffset}px`,
          toggleActions: 'play none none none',
        },
      },
    )
  }, [
    childSelector,
    duration,
    stagger,
    fromY,
    toY,
    initialOpacity,
    finalOpacity,
    start,
    ease,
  ])

  return ref
}
