import 'server-only'

import type { ContactMessageInput } from '@/features/contact/contracts/contact-message.schema'
import { ResendContactMessageSender } from '@/features/contact/data/resend-contact-message-sender'
import { getContactEnv } from '@/lib/env/contact-env'

import { sendContactMessage } from '../application/send-contact-message'

export function createContactService() {
  const { resendApiKey } = getContactEnv()
  const sender = new ResendContactMessageSender(resendApiKey)

  return (message: ContactMessageInput) => sendContactMessage(message, sender)
}
