'use client'

import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin)
}

interface UseTypewriterProps {
  texts: string[]
}

export const useTypewriter = ({ texts }: UseTypewriterProps) => {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const tlMaster = gsap.timeline({ repeat: -1, repeatDelay: 1 })

    texts.forEach((text) => {
      const duration = text.length / 10
      const tlText = gsap.timeline({
        repeat: 1,
        yoyo: true,
        repeatDelay: 1,
        delay: 1,
      })

      tlText.to(textRef.current, {
        duration,
        text,
      })

      tlMaster.add(tlText)
    })
  }, [texts])

  return { textRef }
}
