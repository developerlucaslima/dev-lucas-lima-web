import type { Messages } from 'next-intl'

import type { AppLocale } from '../config'

export interface I18nClientProviderProps {
  readonly children: React.ReactNode
  readonly locale: AppLocale
  readonly messages: Messages
}
