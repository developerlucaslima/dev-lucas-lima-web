import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

import {
  I18N_FALLBACK_TIME_ZONE,
  LOCALE_COOKIE_NAME,
  resolveLocale,
} from './config'
import { getAppMessages } from './messages'

export default getRequestConfig(async () => {
  const localeCookie = (await cookies()).get(LOCALE_COOKIE_NAME)?.value
  const locale = resolveLocale(localeCookie)

  return {
    locale,
    messages: getAppMessages(locale),
    timeZone: I18N_FALLBACK_TIME_ZONE,
  }
})
