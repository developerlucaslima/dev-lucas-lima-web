'use server'

import type { ZodError } from 'zod'

import { createContactService } from '@/features/contact/actions/create-contact-service'
import { ContactMessageDeliveryError } from '@/features/contact/application/contact-message-sender.port'
import { contactMessageSchema } from '@/features/contact/contracts/contact-message.schema'
import type {
  ContactFieldErrors,
  ContactMessageResult,
} from '@/features/contact/contracts/contact-result.types'

function toFieldErrors(error: ZodError): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {}

  for (const issue of error.issues) {
    const field = issue.path[0]

    if (
      (field === 'name' || field === 'email' || field === 'message') &&
      fieldErrors[field] === undefined
    ) {
      fieldErrors[field] = issue.message
    }
  }

  return fieldErrors
}

export async function contactMe(input: unknown): Promise<ContactMessageResult> {
  const validation = contactMessageSchema.safeParse(input)

  if (!validation.success) {
    return {
      status: 'validation_error',
      fieldErrors: toFieldErrors(validation.error),
    }
  }

  try {
    const sendContactMessage = createContactService()
    await sendContactMessage(validation.data)

    return { status: 'success' }
  } catch (error) {
    if (
      error instanceof ContactMessageDeliveryError &&
      error.code === 'unavailable'
    ) {
      return { status: 'unavailable' }
    }

    console.error('Contact message submission failed')
    return { status: 'unexpected_error' }
  }
}
