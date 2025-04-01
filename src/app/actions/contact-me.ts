'use server'

import { Resend } from 'resend'

import type { ContactMeFormData } from './contact-me-type'

export async function contactMe(formData: ContactMeFormData) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not found.')
  }

  const { name, email, message } = formData

  const resend = new Resend(process.env.RESEND_API_KEY)

  const result = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'devcom',
    subject: `${name.toUpperCase()} - CONTACT REQUEST`,
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
          <h2 style="color: #4CAF50; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            ${name.toUpperCase()} - CONTACT REQUEST
          </h2>
          <div style="margin-top: 20px;">
          <h3 style="color: #4CAF50;">Message:</h3>
          <p>${message}</p>
          </div>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #aaa;">
            This email was sent from the contact form on your website.
          </p>
        </div>
      `,
  })

  return result
}
