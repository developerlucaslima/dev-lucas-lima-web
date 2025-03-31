import { z } from 'zod'

export const contactMeSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(20, { message: 'Must have at least 20 characters' }),
})

export type ContactMeFormData = z.infer<typeof contactMeSchema>
