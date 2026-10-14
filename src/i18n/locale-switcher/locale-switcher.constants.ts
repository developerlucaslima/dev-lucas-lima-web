import type { AppLocale } from '../config'

export const localeLabels: Record<AppLocale, 'english' | 'portuguese'> = {
  'en-US': 'english',
  'pt-BR': 'portuguese',
}

export const localeAbbreviations: Record<AppLocale, string> = {
  'en-US': 'EN',
  'pt-BR': 'PT',
}
