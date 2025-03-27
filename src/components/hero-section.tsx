'use client'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(TextPlugin)

export function HeroSection() {
  const texts = [
    'Desenvolvedor Full Stack',
    'Especialista em React',
    'Entusiasta UX/UI',
  ]
  const textRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    const tlMaster = gsap.timeline({ repeat: -1 })

    texts.forEach((text) => {
      const tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 })
      tlText.to(textRef.current, {
        duration: text.length * 0.1,
        text,
        ease: 'none',
      })
      tlMaster.add(tlText)
    })

    gsap.to(cursorRef.current, {
      opacity: 0,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
      duration: 0.5,
    })
  }, [])

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mb-4">
        <h1 className="text-6xl font-bold uppercase sm:text-7xl md:text-8xl">
          <span ref={textRef}></span>
          <span ref={cursorRef}>|</span>
        </h1>
      </div>
    </section>
  )
}
