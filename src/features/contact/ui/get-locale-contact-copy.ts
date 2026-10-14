import type { AppLocale } from '@/i18n/config'
import { appMessages } from '@/i18n/messages'

import type { ContactUiCopy } from './contact-ui-copy.types'

export function getLocaleContactCopy(locale: AppLocale) {
  return appMessages[locale].Contact as unknown as ContactUiCopy
}
