import { ScrollReveal } from '@/components/shared/scroll-reveal/scroll-reveal'
import { ContactScene } from '@/features/contact/ui/components/contact-scene/contact-scene'
import type { ContactUiCopy } from '@/features/contact/ui/contact-ui-copy.types'

interface ContactMeSectionProps {
  readonly copy: ContactUiCopy
}

export function ContactMeSection({ copy }: ContactMeSectionProps) {
  return (
    <section
      id="contact"
      className="container mx-auto flex max-w-5xl flex-col py-16"
    >
      <ScrollReveal className="mb-16 text-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-light uppercase sm:text-3xl md:text-4xl">
            {copy.title}
          </h2>
          <div className="bg-foreground mx-auto h-0.5 w-20" />
        </div>
      </ScrollReveal>
      <ContactScene copy={copy} />
    </section>
  )
}
