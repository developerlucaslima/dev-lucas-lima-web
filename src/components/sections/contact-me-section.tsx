'use client'

import { english } from '@/config/english-config'
import { useMoonRocketAnimation } from '@/hooks/animations/use-moon-rocket-animation'
import { useScrollFadeIn } from '@/hooks/animations/use-scroll-fade-in'
import { useScrollFadeSlideX } from '@/hooks/animations/use-scroll-fade-slide-x'

import { ContactMeForm } from '../contact-me-form'
import { MoonAndRocket } from '../ui/moon'

export function ContactMeSection() {
  const config = english.contactMe

  const { moonRef, rocketRef, containerRef, triggerAnimation } =
    useMoonRocketAnimation()

  const formInitialAnimation = useScrollFadeSlideX({ fromX: -100 })
  const moonInitialAnimation = useScrollFadeSlideX({ fromX: 100 })
  const titleRef = useScrollFadeIn()

  return (
    <section
      id="about"
      ref={containerRef}
      className="container mx-auto flex max-w-5xl flex-col py-16"
    >
      <div ref={titleRef} className="mb-16 text-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl">
            {config.title}
          </h2>
          <div className="bg-foreground mx-auto h-0.5 w-20" />
        </div>
      </div>

      <div className="flex flex-wrap-reverse items-center justify-center gap-4 sm:flex-wrap sm:gap-0">
        <div
          ref={formInitialAnimation}
          className="mx-auto flex w-full max-w-md items-center justify-center"
        >
          <ContactMeForm shouldAnimate={triggerAnimation} />
        </div>

        <div
          ref={moonInitialAnimation}
          className="mx-auto flex w-full max-w-40 items-center justify-center sm:max-w-xs"
        >
          <MoonAndRocket moonRef={moonRef} rocketRef={rocketRef} />
        </div>
      </div>
    </section>
  )
}
