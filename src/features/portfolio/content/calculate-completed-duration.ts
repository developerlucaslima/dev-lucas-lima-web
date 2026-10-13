export interface CompletedDuration {
  years: number
  months: number
}

export function calculateCompletedDuration(
  startDate: Date,
  asOfDate: Date,
): CompletedDuration {
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(asOfDate.getTime())) {
    throw new RangeError('Dates must be valid.')
  }

  const startYear = startDate.getUTCFullYear()
  const startMonth = startDate.getUTCMonth()
  const startDay = startDate.getUTCDate()
  const asOfYear = asOfDate.getUTCFullYear()
  const asOfMonth = asOfDate.getUTCMonth()
  const asOfDay = asOfDate.getUTCDate()

  if (
    asOfYear < startYear ||
    (asOfYear === startYear && asOfMonth < startMonth) ||
    (asOfYear === startYear && asOfMonth === startMonth && asOfDay < startDay)
  ) {
    throw new RangeError('The start date cannot be in the future.')
  }

  const monthsSinceStart =
    (asOfYear - startYear) * 12 + (asOfMonth - startMonth)
  const anniversaryMonth = (startMonth + monthsSinceStart) % 12
  const anniversaryYear =
    startYear + Math.floor((startMonth + monthsSinceStart) / 12)
  const daysInAnniversaryMonth = new Date(
    Date.UTC(anniversaryYear, anniversaryMonth + 1, 0),
  ).getUTCDate()
  const anniversaryDay = Math.min(startDay, daysInAnniversaryMonth)
  const completedMonths = monthsSinceStart - Number(asOfDay < anniversaryDay)

  return {
    years: Math.floor(completedMonths / 12),
    months: completedMonths % 12,
  }
}
