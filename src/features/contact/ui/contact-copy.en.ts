import type { ContactUiCopy } from './contact-ui-copy.types'

export const contactCopyEn = {
  title: 'Space Communication',
  form: {
    formTitle: 'Launch Your Message',
    formSubtitle: 'Prepare for liftoff!',
    inputs: [
      {
        name: 'Astronaut Name',
        placeholder: 'Your astronaut name',
        type: '',
        register: 'name',
      },
      {
        name: 'Space Email',
        placeholder: 'astronaut@example.space',
        type: 'email',
        register: 'email',
      },
    ],
    textArea: {
      name: 'Space Message',
      placeholder: 'Your message to the cosmos...',
      register: 'message',
    },
    buttonTexts: {
      isSubmitting: 'Launching...',
      isNotSubmitting: 'Launch Message',
    },
  },
  formErrorMessages: {
    name: 'Name must be at least 2 characters',
    email: 'Enter a valid space email',
    message: 'Message must be at least 20 characters',
  },
  submitToastMessages: {
    success: {
      title: 'Launched Successfully!',
      description:
        'Your message has successfully entered orbit and is on its way to the cosmos!',
    },
    error: {
      title: 'Communication Failure',
      description:
        'Communication satellites are experiencing interference! Please try again later.',
    },
  },
} as const satisfies ContactUiCopy
