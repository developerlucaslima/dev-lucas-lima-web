'use server'

import { cookies } from 'next/headers'

import { isSupportedLocale, LOCALE_COOKIE_NAME } from '@/i18n/config'

export async function setLocale(value: string) {
  if (!isSupportedLocale(value)) return

  const cookieStore = await cookies()
  cookieStore.set(LOCALE_COOKIE_NAME, value, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}
