import type { ContactMessageInput } from '@/features/contact/contracts/contact-message.schema'

import type { ContactMessageSender } from './contact-message-sender.port'

export async function sendContactMessage(
  { name, email, message }: ContactMessageInput,
  sender: ContactMessageSender,
): Promise<void> {
  await sender.send({
    subject: `${name.toUpperCase()} - CONTACT REQUEST`,
    text: `${name.toUpperCase()} - CONTACT REQUEST

Message:
${message}

Name: ${name}
Email: ${email}

This email was sent from the contact form on your website.`,
  })
}
