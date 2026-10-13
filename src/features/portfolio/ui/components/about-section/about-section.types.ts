import type { ReactNode } from 'react'

import type { HardSkillContent } from '@/features/portfolio/content/portfolio-content.types'

export interface AboutSectionProps {
  readonly children: ReactNode
  readonly hardSkills: readonly HardSkillContent[]
}
