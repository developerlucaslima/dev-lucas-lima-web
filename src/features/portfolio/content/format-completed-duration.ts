import type { AppLocale } from '@/i18n/config'

import type { CompletedDuration } from './calculate-completed-duration'

export function formatCompletedDuration(
  { years, months }: CompletedDuration,
  locale: AppLocale,
) {
  const isPortuguese = locale === 'pt-BR'
  const parts: string[] = []

  if (years > 0) {
    const unit = isPortuguese
      ? years === 1
        ? 'ano'
        : 'anos'
      : years === 1
        ? 'year'
        : 'years'

    parts.push(`${new Intl.NumberFormat(locale).format(years)} ${unit}`)
  }

  if (months > 0) {
    const unit = isPortuguese
      ? months === 1
        ? 'mês'
        : 'meses'
      : months === 1
        ? 'month'
        : 'months'

    parts.push(`${new Intl.NumberFormat(locale).format(months)} ${unit}`)
  }

  if (parts.length > 1) {
    return isPortuguese
      ? `${parts[0]} e ${parts[1]}`
      : `${parts[0]} and ${parts[1]}`
  }

  return parts[0] ?? (isPortuguese ? '0 meses' : '0 months')
}
