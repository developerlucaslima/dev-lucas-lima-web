import { z } from 'zod'

import { english } from '@/config/english-config'

const formErrorMessages = english.contactMe.formErrorMessages

export const contactMeSchema = z.object({
  name: z.string().min(2, { message: formErrorMessages.name }),
  email: z.string().email({ message: formErrorMessages.email }),
  message: z.string().min(20, { message: formErrorMessages.message }),
})

export type ContactMeFormData = z.infer<typeof contactMeSchema>
