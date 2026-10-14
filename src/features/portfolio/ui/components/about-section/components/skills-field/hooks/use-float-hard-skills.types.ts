import type { RefObject } from 'react'

import type { HardSkillContent } from '@/features/portfolio/content/portfolio-content.types'

import type { SkillFloatingState } from '../skills-field.utils.types'

export interface UseFloatHardSkillsProps {
  readonly hardSkills: readonly Pick<HardSkillContent, 'id'>[]
  readonly hardSkillsSectionRef: RefObject<HTMLDivElement | null>
}

export interface SkillFloatingActor {
  readonly element: HTMLElement
  state: SkillFloatingState
  readonly setX: (value: number) => void
  readonly setY: (value: number) => void
}

export interface SkillFloatingController {
  readonly resize: () => void
  readonly stop: () => void
}
