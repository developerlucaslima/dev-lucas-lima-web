export const SUPPORTED_LOCALES = ['en-US', 'pt-BR'] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = 'en-US'
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'
export const I18N_FALLBACK_TIME_ZONE = 'America/Sao_Paulo'

export function isSupportedLocale(
  value: string | null | undefined,
): value is AppLocale {
  return SUPPORTED_LOCALES.some((locale) => locale === value)
}

export function resolveLocale(value: string | null | undefined): AppLocale {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE
}
