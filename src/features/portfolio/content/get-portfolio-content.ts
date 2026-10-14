import 'server-only'

import { calculateCompletedDuration } from './calculate-completed-duration'
import { formatCompletedDurationEn } from './format-completed-duration.en'
import { portfolioContentEn } from './portfolio-content.en'
import type { PortfolioContent } from './portfolio-content.types'

function getSaoPauloCalendarDate(now: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(now)
  const getPart = (type: 'year' | 'month' | 'day') =>
    Number(parts.find((part) => part.type === type)?.value)

  return new Date(
    Date.UTC(getPart('year'), getPart('month') - 1, getPart('day')),
  )
}

export function getPortfolioContent(now: Date = new Date()): PortfolioContent {
  const asOfDate = getSaoPauloCalendarDate(now)
  const age = calculateCompletedDuration(
    new Date(Date.UTC(1995, 10, 10)),
    asOfDate,
  ).years
  const developerExperience = formatCompletedDurationEn(
    calculateCompletedDuration(new Date(Date.UTC(2022, 6, 1)), asOfDate),
  )
  const paragraphs = portfolioContentEn.about.paragraphs

  return {
    hero: portfolioContentEn.hero,
    about: {
      ...portfolioContentEn.about,
      paragraphs: [
        paragraphs.introduction.replace('{age}', String(age)),
        paragraphs.developerJourney.replace('{duration}', developerExperience),
        paragraphs.professionalExperience,
      ],
    },
    philosophy: portfolioContentEn.philosophy,
    journey: portfolioContentEn.journey,
    hardSkills: portfolioContentEn.hardSkills,
  }
}
