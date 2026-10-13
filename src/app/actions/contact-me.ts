'use server'

import { Resend } from 'resend'

import { contactMessageSchema } from '@/features/contact/contracts/contact-message.schema'

export async function contactMe(input: unknown) {
  const { name, email, message } = contactMessageSchema.parse(input)

  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not found.')
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const result = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'developerlucaslima@gmail.com',
    subject: `${name.toUpperCase()} - CONTACT REQUEST`,
    text: `${name.toUpperCase()} - CONTACT REQUEST

Message:
${message}

Name: ${name}
Email: ${email}

This email was sent from the contact form on your website.`,
  })

  return result
}
