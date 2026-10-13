'use client'

import { useFadeIn } from '@/hooks/animations/use-fade-in'
import { useScrollFadeOut } from '@/hooks/animations/use-scroll-fade-out'
import { useTypewriter } from '@/hooks/animations/use-typewriter'

interface HeroIntroProps {
  readonly subtitles: readonly string[]
  readonly scrollDown: string
}

export function HeroIntro({ subtitles, scrollDown }: HeroIntroProps) {
  const { textRef } = useTypewriter<HTMLSpanElement>({ texts: subtitles })
  const subtitleRef = useFadeIn<HTMLHeadingElement>()
  const scrollMessageRef = useScrollFadeOut<HTMLParagraphElement>()

  return (
    <>
      <div className="text-foreground/70 h-16">
        <h2
          ref={subtitleRef}
          className="text-2xl font-light sm:text-3xl md:text-4xl"
        >
          <span>&lt;</span>
          <span ref={textRef}>{subtitles[0]}</span>
          <span className="animate-caret-blink">|</span>
          <span>/&gt;</span>
        </h2>
      </div>

      <p
        ref={scrollMessageRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transform animate-bounce uppercase"
      >
        {scrollDown}
      </p>
    </>
  )
}
