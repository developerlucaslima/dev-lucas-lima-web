import type { RefObject } from 'react'

import type { HardSkillContent } from '@/features/portfolio/content/portfolio-content.types'

export interface UseFloatHardSkillsProps {
  readonly hardSkills: readonly Pick<HardSkillContent, 'id'>[]
  readonly hardSkillsSectionRef: RefObject<HTMLDivElement | null>
}
