'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'

interface UseFadeInProps {
  duration?: number
  delay?: number
}

export const useFadeIn = <T extends HTMLElement = HTMLDivElement>({
  duration = 1.5,
  delay = 0.5,
}: UseFadeInProps = {}) => {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const context = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration, delay })
    }, ref)

    return () => context.revert()
  }, [duration, delay])

  return ref
}
