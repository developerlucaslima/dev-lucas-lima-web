'use client'

import { english } from '@/config/english-config'
import { useAlienAnimated } from '@/hooks/animations/use-alien'
import { useScrollFadeIn } from '@/hooks/animations/use-scroll-fade-in'
import { useScrollFadeSlideX } from '@/hooks/animations/use-scroll-fade-slide-x'
import { useScrollRotateSlideX } from '@/hooks/animations/use-scroll-rotate-slide-x'

import { ContactMeForm } from '../contact-me-form'
import { Alien } from '../ui/alien'

export function ContactMeSection() {
  const config = english.contactMe
  const { containerRef, antennaRef, characterRef, leftEyeRef, rightEyeRef } =
    useAlienAnimated()

  const alienRotate = useScrollRotateSlideX()
  const formAnimation = useScrollFadeSlideX()
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
        {/* Form Side */}
        <div
          ref={formAnimation}
          className="mx-auto flex w-full max-w-md items-center justify-center"
        >
          <ContactMeForm />
        </div>

        {/* Character Side */}
        <div
          ref={alienRotate}
          className="mx-auto flex w-full max-w-md items-center justify-center"
        >
          <Alien
            characterRef={characterRef}
            leftEyeRef={leftEyeRef}
            rightEyeRef={rightEyeRef}
            antennaRef={antennaRef}
          />
        </div>
      </div>
    </section>
  )
}
