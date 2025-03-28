'use client'

import { heroConfig } from '@/config/hero-config'
import { useFadeIn } from '@/hooks/animations/use-fade-in'
import { useFadeSlideY } from '@/hooks/animations/use-fade-slide-y'
import { useTypewriter } from '@/hooks/animations/use-typewriter'

export function HeroSection() {
  const { textRef, cursorRef } = useTypewriter({ texts: heroConfig.subtitles })

  const titleRef = useFadeSlideY({ delay: 0 })
  const subtitleRef = useFadeIn()
  const scrollRef = useFadeIn({ delay: 2 })

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div ref={titleRef} className="mb-4">
        <h1 className="text-center text-4xl font-bold uppercase sm:text-7xl md:text-8xl">
          {heroConfig.title}
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
          className="text-muted-foreground hover:text-foreground flex flex-col items-center transition-colors duration-300"
        >
          <span className="mb-2 text-sm uppercase">
            {heroConfig.scrollDown.text}
          </span>
          <heroConfig.scrollDown.icon className="animate-bounce" size={24} />
        </a>
      </div>
    </section>
  )
}
