interface CalculateDurationFrom {
  startDate?: Date
}

export function calculateDurationFrom({
  startDate = new Date(2022, 6, 1),
}: CalculateDurationFrom): string {
  const now = new Date()

  let years = now.getFullYear() - startDate.getFullYear()
  let months = now.getMonth() - startDate.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  const duration = `${years}.${months}`
  return duration
}
