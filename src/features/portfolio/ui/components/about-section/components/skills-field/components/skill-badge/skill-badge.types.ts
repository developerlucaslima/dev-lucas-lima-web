import type { HardSkillContent } from '@/features/portfolio/content/portfolio-content.types'

export interface SkillBadgeProps extends HardSkillContent {
  readonly onClick: () => void
  readonly isOrganized: boolean
  readonly isMotionDisabled?: boolean
}
