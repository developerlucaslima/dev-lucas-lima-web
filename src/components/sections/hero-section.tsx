'use client'

import Link from 'next/link'

import { heroConfig } from '@/config/hero-config'
import { useFadeIn } from '@/hooks/animations/use-fade-in'
import { useFadeSlideY } from '@/hooks/animations/use-fade-slide-y'
import { useTypewriter } from '@/hooks/animations/use-typewriter'

export function HeroSection() {
  const { textRef } = useTypewriter({ texts: heroConfig.subtitles })
  const titleRef = useFadeSlideY({ delay: 0 })
  const subtitleRef = useFadeIn()

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center">
      <Link href="#about">
        <div ref={titleRef} className="mb-4">
          <h1 className="text-4xl font-bold uppercase sm:text-7xl md:text-8xl">
            {heroConfig.title}
          </h1>
        </div>

        <div className="text-foreground/80 h-16">
          <h2
            ref={subtitleRef}
            className="text-2xl font-light sm:text-3xl md:text-4xl"
          >
            <span>&lt;</span>
            <span ref={textRef} />
            <span className="animate-caret-blink">|</span>
            <span>/&gt;</span>
          </h2>
        </div>
      </Link>
    </section>
  )
}
