'use client'

import { ContactMeForm } from '@/components/contact-me-form'
import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'
import { MoonAndRocket } from '@/components/ui/moon'
import type { ContactUiCopy } from '@/features/contact/ui/contact-ui-copy.types'
import { useMoonRocketAnimation } from '@/hooks/animations/use-moon-rocket-animation'

interface ContactSceneProps {
  readonly copy: ContactUiCopy
}

export function ContactScene({ copy }: ContactSceneProps) {
  const { moonRef, rocketRef, triggerAnimation } = useMoonRocketAnimation()

  return (
    <div className="flex flex-wrap-reverse items-center justify-center gap-4 sm:flex-wrap sm:gap-0">
      <ScrollReveal
        className="mx-auto flex w-full max-w-md items-center justify-center"
        fromX={-100}
        duration={1.5}
      >
        <ContactMeForm
          copy={copy.form}
          submitToastMessages={copy.submitToastMessages}
          shouldAnimate={triggerAnimation}
        />
      </ScrollReveal>

      <ScrollReveal
        className="mx-auto flex w-full max-w-40 items-center justify-center sm:max-w-xs"
        fromX={100}
        duration={1.5}
      >
        <MoonAndRocket moonRef={moonRef} rocketRef={rocketRef} />
      </ScrollReveal>
    </div>
  )
}
