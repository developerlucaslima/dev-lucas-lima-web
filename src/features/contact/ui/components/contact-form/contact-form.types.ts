import type { ContactUiCopy } from '@/features/contact/ui/contact-ui-copy.types'

export interface ContactFormProps {
  readonly copy: ContactUiCopy['form']
  readonly formErrorMessages: ContactUiCopy['formErrorMessages']
  readonly submitToastMessages: ContactUiCopy['submitToastMessages']
  readonly shouldAnimate: () => void
}
