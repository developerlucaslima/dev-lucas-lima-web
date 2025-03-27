'use client'

import { ArrowDown } from 'lucide-react'

import { useFadeIn } from '@/hooks/animations/use-fade-in'
import { useFadeSlideY } from '@/hooks/animations/use-fade-slide-y'
import { useTypewriter } from '@/hooks/animations/use-typewriter'

export function HeroSection() {
  const texts = [
    'Full Stack Developer',
    'Stronger in Frontend',
    'UI/UX Enthusiast',
  ]

  const { textRef, cursorRef } = useTypewriter({
    texts,
  })

  const titleRef = useFadeSlideY()
  const subtitleRef = useFadeIn()
  const scrollRef = useFadeIn({ delay: 2 })

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div ref={titleRef} className="mb-4">
        <h1 className="text-6xl font-bold uppercase sm:text-7xl md:text-8xl">
          Dev Lucas Lima
        </h1>
      </div>

      <div className="h-16">
        <h2
          ref={subtitleRef}
          className="text-2xl font-light sm:text-3xl md:text-4xl"
        >
          <span>&lt;</span>
          <span ref={textRef}></span>
          <span ref={cursorRef}>|</span>
          <span>/&gt;</span>
        </h2>
      </div>

      <div ref={scrollRef} className="mt-12">
        <a
          href="#about"
          className="group text-muted-foreground flex flex-col items-center transition-colors duration-300"
        >
          <ArrowDown className="animate-bounce" size={24} />
        </a>
      </div>
    </section>
  )
}
