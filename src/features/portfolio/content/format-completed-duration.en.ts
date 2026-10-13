import type { CompletedDuration } from './calculate-completed-duration'

export function formatCompletedDurationEn({
  years,
  months,
}: CompletedDuration) {
  const parts: string[] = []

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'year' : 'years'}`)
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  }

  return parts.length > 1
    ? `${parts[0]} and ${parts[1]}`
    : (parts[0] ?? '0 months')
}
