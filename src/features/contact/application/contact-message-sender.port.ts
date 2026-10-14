export type ContactMessageDeliveryErrorCode = 'unavailable' | 'delivery_failed'

export class ContactMessageDeliveryError extends Error {
  constructor(readonly code: ContactMessageDeliveryErrorCode) {
    super(code)
    this.name = 'ContactMessageDeliveryError'
  }
}

export interface ContactEmailContent {
  subject: string
  text: string
}

export interface ContactMessageSender {
  send(email: ContactEmailContent): Promise<void>
}
