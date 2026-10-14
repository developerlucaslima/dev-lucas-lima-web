'use client'

import { NextIntlClientProvider } from 'next-intl'

import { I18N_FALLBACK_TIME_ZONE } from '../config'
import type { I18nClientProviderProps } from './i18n-client-provider.types'

export function I18nClientProvider({
  children,
  locale,
  messages,
}: I18nClientProviderProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={I18N_FALLBACK_TIME_ZONE}
    >
      {children}
    </NextIntlClientProvider>
  )
}
