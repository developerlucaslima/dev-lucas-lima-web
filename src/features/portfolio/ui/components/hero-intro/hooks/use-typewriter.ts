'use client'

import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { gsap } from '@/lib/animation/gsap-client'

interface UseTypewriterProps {
  texts: readonly string[]
}

export const useTypewriter = <T extends HTMLElement = HTMLSpanElement>({
  texts,
}: UseTypewriterProps) => {
  const textRef = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!textRef.current) return

    if (prefersReducedMotion) {
      textRef.current.textContent = texts[0] ?? ''
      return
    }

    const element = textRef.current
    element.textContent = ''

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 })

      texts.forEach((text) => {
        const characters = Array.from(text)
        const duration = characters.length / 10
        const progress = { value: 0 }

        timeline.to(progress, {
          value: characters.length,
          duration,
          delay: 1,
          ease: 'none',
          onUpdate: () => {
            element.textContent = characters
              .slice(0, Math.floor(progress.value))
              .join('')
          },
        })

        timeline.to(progress, {
          value: 0,
          duration,
          delay: 1,
          ease: 'none',
          onUpdate: () => {
            element.textContent = characters
              .slice(0, Math.ceil(progress.value))
              .join('')
          },
        })
      })
    }, textRef)

    return () => context.revert()
  }, [prefersReducedMotion, texts])

  return { textRef }
}
