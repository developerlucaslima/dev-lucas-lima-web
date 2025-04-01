'use client'

import { english } from '@/config/english-config'
import { useFadeIn } from '@/hooks/animations/use-fade-in'
import { useFadeSlideY } from '@/hooks/animations/use-fade-slide-y'
import { useScrollFadeOut } from '@/hooks/animations/use-scroll-fade-out'
import { useTypewriter } from '@/hooks/animations/use-typewriter'

export function HeroSection() {
  const config = english.hero
  const { textRef } = useTypewriter({ texts: config.subtitles })
  const titleRef = useFadeSlideY({ delay: 0 })
  const subtitleRef = useFadeIn()
  const scrollMessage = useScrollFadeOut()

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center">
      <div ref={titleRef} className="mb-4">
        <h1 className="text-4xl font-bold uppercase transition delay-50 duration-150 ease-in-out hover:-translate-y-1 hover:scale-102 sm:text-7xl md:text-8xl">
          {config.sectionTitle}
        </h1>
      </div>

      <div className="text-foreground/70 h-16">
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

      <p
        ref={scrollMessage}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transform animate-bounce uppercase"
      >
        {config.scrollDown}
      </p>
    </section>
  )
}
