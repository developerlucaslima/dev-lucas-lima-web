import type { JourneyCardContent } from '@/features/portfolio/content/portfolio-content.types'
export interface ExperienceCardProps {
  readonly content: JourneyCardContent
  readonly detailsLabel: string
  readonly companyLinkLabel: string
}
