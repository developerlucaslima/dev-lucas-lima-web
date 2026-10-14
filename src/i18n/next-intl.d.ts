import type { AppLocale } from './config'
import type enMessages from './messages/en-US.json'

declare module 'next-intl' {
  interface AppConfig {
    Locale: AppLocale
    Messages: typeof enMessages
  }
}
