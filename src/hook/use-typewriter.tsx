'use client'

import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(TextPlugin)

interface UseTypewriterProps {
  texts: string[]
}

export const useTypewriter = ({ texts }: UseTypewriterProps) => {
  const textRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: 'power2.inOut',
    })

    const tlMaster = gsap.timeline({ repeat: -1, repeatDelay: 1 })

    texts.forEach((text) => {
      const duration = text.length / 10
      const tlText = gsap.timeline({
        repeat: 1,
        yoyo: true,
        repeatDelay: 1,
      })

      tlText.to(textRef.current, {
        duration,
        text,
      })

      tlMaster.add(tlText)
    })
  }, [texts])

  return { textRef, cursorRef }
}
