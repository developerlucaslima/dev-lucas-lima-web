import 'server-only'

export function getContactEnv() {
  return {
    resendApiKey: process.env.RESEND_API_KEY?.trim() || undefined,
  }
}
