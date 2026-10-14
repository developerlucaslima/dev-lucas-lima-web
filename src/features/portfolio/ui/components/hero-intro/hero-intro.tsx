'use client'

import { heroIntroStyles } from './hero-intro.styles'
import type { HeroIntroProps } from './hero-intro.types'
import { useFadeIn } from './hooks/use-fade-in'
import { useScrollFadeOut } from './hooks/use-scroll-fade-out'
import { useTypewriter } from './hooks/use-typewriter'

export function HeroIntro({ subtitles, scrollDown }: HeroIntroProps) {
  const { textRef } = useTypewriter<HTMLSpanElement>({ texts: subtitles })
  const subtitleRef = useFadeIn<HTMLHeadingElement>()
  const scrollMessageRef = useScrollFadeOut<HTMLParagraphElement>()

  return (
    <>
      <div className={heroIntroStyles.subtitleContainer}>
        <h2 ref={subtitleRef} className={heroIntroStyles.subtitle}>
          <span>&lt;</span>
          <span ref={textRef}>{subtitles[0]}</span>
          <span className={heroIntroStyles.caret}>|</span>
          <span>/&gt;</span>
        </h2>
      </div>

      <p ref={scrollMessageRef} className={heroIntroStyles.scrollMessage}>
        {scrollDown}
      </p>
    </>
  )
}
