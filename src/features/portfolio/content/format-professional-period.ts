export function formatProfessionalDate(value: string, locale: string): string {
  if (!/^\d{4}(?:-\d{2})?$/.test(value))
    throw new RangeError('Expected a year or a year-month date')
  const [year, month] = value.split('-').map(Number)
  if (year < 1000 || (month !== undefined && (month < 1 || month > 12)))
    throw new RangeError('Invalid professional date')
  if (month === undefined) return String(year)
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)))
}
export function formatProfessionalPeriod(
  start: string,
  end: string | undefined,
  locale: string,
  presentLabel: string,
): string {
  if (end && end < start) throw new RangeError('End date precedes start date')
  return `${formatProfessionalDate(start, locale)} – ${end ? formatProfessionalDate(end, locale) : presentLabel}`
}
