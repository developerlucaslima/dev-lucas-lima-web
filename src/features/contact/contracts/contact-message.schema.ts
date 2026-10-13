import { z } from 'zod'

const hasHeaderControlCharacters = (value: string) =>
  Array.from(value).some((character) => {
    const codePoint = character.codePointAt(0) ?? 0

    return codePoint <= 0x1f || (codePoint >= 0x7f && codePoint <= 0x9f)
  })

export const contactMessageSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(100, { message: 'Name must be at most 100 characters' })
      .refine((name) => !hasHeaderControlCharacters(name), {
        message: 'Name cannot contain control characters',
      }),
    email: z
      .string()
      .trim()
      .max(254, { message: 'Enter a valid space email' })
      .email({ message: 'Enter a valid space email' }),
    message: z
      .string()
      .trim()
      .min(20, { message: 'Message must be at least 20 characters' })
      .max(5000, { message: 'Message must be at most 5000 characters' }),
  })
  .strict()

export type ContactMessageInput = z.infer<typeof contactMessageSchema>
