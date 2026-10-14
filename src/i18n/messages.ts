import type { AppLocale } from './config'
import enMessages from './messages/en-US.json'
import ptMessages from './messages/pt-BR.json'

export const appMessages = {
  'en-US': enMessages,
  'pt-BR': ptMessages,
} satisfies Record<AppLocale, typeof enMessages>

export function getAppMessages(locale: AppLocale) {
  return appMessages[locale]
}
