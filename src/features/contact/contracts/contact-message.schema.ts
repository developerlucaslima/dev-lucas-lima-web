import { z } from 'zod'

const hasHeaderControlCharacters = (value: string) =>
  Array.from(value).some((character) => {
    const codePoint = character.codePointAt(0) ?? 0

    return codePoint <= 0x1f || (codePoint >= 0x7f && codePoint <= 0x9f)
  })

export interface ContactMessageValidationMessages {
  readonly nameMin: string
  readonly nameMax: string
  readonly nameControlCharacters: string
  readonly emailInvalid: string
  readonly messageMin: string
  readonly messageMax: string
}

export function createContactMessageSchema(
  messages: ContactMessageValidationMessages,
) {
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(2, { message: messages.nameMin })
        .max(100, { message: messages.nameMax })
        .refine((name) => !hasHeaderControlCharacters(name), {
          message: messages.nameControlCharacters,
        }),
      email: z
        .string()
        .trim()
        .max(254, { message: messages.emailInvalid })
        .email({ message: messages.emailInvalid }),
      message: z
        .string()
        .trim()
        .min(20, { message: messages.messageMin })
        .max(5000, { message: messages.messageMax }),
    })
    .strict()
}

export const contactMessageSchema = createContactMessageSchema({
  nameMin: 'Name must be at least 2 characters',
  nameMax: 'Name must be at most 100 characters',
  nameControlCharacters: 'Name cannot contain control characters',
  emailInvalid: 'Enter a valid space email',
  messageMin: 'Message must be at least 20 characters',
  messageMax: 'Message must be at most 5000 characters',
})

export type ContactMessageInput = z.infer<typeof contactMessageSchema>
