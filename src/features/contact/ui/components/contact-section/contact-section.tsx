import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'
import { ContactScene } from '@/features/contact/ui/components/contact-scene/contact-scene'

import { contactSectionStyles } from './contact-section.styles'
import type { ContactSectionProps } from './contact-section.types'

export function ContactSection({ copy }: ContactSectionProps) {
  return (
    <section id="contact" className={contactSectionStyles.section}>
      <ScrollReveal className={contactSectionStyles.headingReveal}>
        <div className="text-center">
          <h2 className={contactSectionStyles.heading}>{copy.title}</h2>
          <div className={contactSectionStyles.headingRule} />
        </div>
      </ScrollReveal>
      <ContactScene copy={copy} />
    </section>
  )
}
