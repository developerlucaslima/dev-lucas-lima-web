'use client'

import { useEffect, useRef } from 'react'

import { gsap } from '@/lib/animation/gsap-client'

interface UseFadeSlideYProps {
  duration?: number
  delay?: number
  fromY?: number
  toY?: number
}

export const useFadeSlideY = <T extends HTMLElement = HTMLDivElement>({
  duration = 1.5,
  delay = 0.5,
  fromY = 30,
  toY = 0,
}: UseFadeSlideYProps = {}) => {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const context = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: fromY },
        { opacity: 1, y: toY, duration, delay },
      )
    }, ref)

    return () => context.revert()
  }, [delay, duration, fromY, toY])

  return ref
}
