'use client'

import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap } from '@/lib/animation/gsap-client'

interface UseFadeInProps {
  duration?: number
  delay?: number
}

export const useFadeIn = <T extends HTMLElement = HTMLDivElement>({
  duration = 1.5,
  delay = 0.5,
}: UseFadeInProps = {}) => {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return

    const context = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration, delay })
    }, ref)

    return () => context.revert()
  }, [delay, duration, prefersReducedMotion])

  return ref
}
