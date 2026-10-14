'use client'

import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'
import { ContactForm } from '@/features/contact/ui/components/contact-form/contact-form'
import { useMoonRocketAnimation } from '@/features/contact/ui/components/moon-and-rocket/hooks/use-moon-rocket-animation'
import { MoonAndRocket } from '@/features/contact/ui/components/moon-and-rocket/moon-and-rocket'

import { contactSceneStyles } from './contact-scene.styles'
import type { ContactSceneProps } from './contact-scene.types'

export function ContactScene({ copy }: ContactSceneProps) {
  const { moonRef, rocketRef, triggerAnimation } = useMoonRocketAnimation()

  return (
    <div className={contactSceneStyles.root}>
      <ScrollReveal
        className={contactSceneStyles.form}
        fromX={-100}
        duration={1.5}
      >
        <ContactForm
          copy={copy.form}
          formErrorMessages={copy.formErrorMessages}
          submitToastMessages={copy.submitToastMessages}
          shouldAnimate={triggerAnimation}
        />
      </ScrollReveal>

      <ScrollReveal
        className={contactSceneStyles.illustration}
        fromX={100}
        duration={1.5}
      >
        <MoonAndRocket
          moonRef={moonRef}
          moonTitle={copy.illustration.moonTitle}
          rocketTitle={copy.illustration.rocketTitle}
          rocketRef={rocketRef}
        />
      </ScrollReveal>
    </div>
  )
}
