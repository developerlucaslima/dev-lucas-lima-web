import 'server-only'

import { Resend } from 'resend'

import {
  type ContactEmailContent,
  ContactMessageDeliveryError,
  type ContactMessageSender,
} from '@/features/contact/application/contact-message-sender.port'

export class ResendContactMessageSender implements ContactMessageSender {
  private readonly resend: Resend

  constructor(apiKey: string | undefined) {
    if (!apiKey) {
      throw new ContactMessageDeliveryError('unavailable')
    }

    this.resend = new Resend(apiKey)
  }

  async send(email: ContactEmailContent): Promise<void> {
    try {
      const result = await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'developerlucaslima@gmail.com',
        ...email,
      })

      if (result.error || !result.data?.id) {
        throw new ContactMessageDeliveryError('delivery_failed')
      }
    } catch (error) {
      if (error instanceof ContactMessageDeliveryError) {
        throw error
      }

      throw new ContactMessageDeliveryError('delivery_failed')
    }
  }
}
