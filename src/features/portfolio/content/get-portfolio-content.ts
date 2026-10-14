import 'server-only'

import type { AppLocale } from '@/i18n/config'
import { appMessages } from '@/i18n/messages'

import { calculateCompletedDuration } from './calculate-completed-duration'
import { formatCompletedDuration } from './format-completed-duration'
import type {
  PortfolioContent,
  StaticPortfolioContent,
} from './portfolio-content.types'

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

export function getPortfolioContent(
  locale: AppLocale,
  now: Date = new Date(),
): PortfolioContent {
  const asOfDate = getSaoPauloCalendarDate(now)
  const staticContent = appMessages[locale]
    .Portfolio as unknown as StaticPortfolioContent
  const age = calculateCompletedDuration(
    new Date(Date.UTC(1995, 10, 10)),
    asOfDate,
  ).years
  const developerExperience = formatCompletedDuration(
    calculateCompletedDuration(new Date(Date.UTC(2022, 6, 1)), asOfDate),
    locale,
  )
  const paragraphs = staticContent.about.paragraphs

  return {
    hero: staticContent.hero,
    about: {
      sectionTitle: staticContent.about.sectionTitle,
      aboutCard: staticContent.about.aboutCard,
      image: staticContent.about.image,
      paragraphs: [
        paragraphs.introduction.replace('{age}', String(age)),
        paragraphs.developerJourney.replace('{duration}', developerExperience),
        paragraphs.professionalExperience,
      ],
    },
    philosophy: staticContent.philosophy,
    journey: staticContent.journey,
    hardSkills: staticContent.hardSkills,
  }
}
