'use client'

import { gsap } from 'gsap'
import { useCallback, useEffect, useRef } from 'react'

import {
  SKILL_BADGE_SIZE,
  SKILL_GRID_BOTTOM_GAP,
} from '../skills-field.constants'
import { calculateSkillGridPositions } from '../skills-field.utils'
import type { UseOrganizeHardSkillsProps } from './use-organize-hard-skills.types'

export function useOrganizeHardSkills({
  hardSkills,
  hardSkillsSectionRef,
  hardSkillsSectionBottomRef,
}: UseOrganizeHardSkillsProps) {
  const animationsRef = useRef<Record<string, gsap.core.Tween>>({})

  const killAnimations = useCallback(() => {
    Object.values(animationsRef.current).forEach((tween) => tween.kill())
    animationsRef.current = {}
  }, [])

  const organizeHardSkills = useCallback(
    (duration = 1) => {
      const containerWidth = hardSkillsSectionRef.current?.clientWidth || 0
      const bottomAreaTop = hardSkillsSectionBottomRef.current?.offsetTop || 0
      const layout = calculateSkillGridPositions({
        containerWidth,
        bottomAreaTop,
        skillCount: hardSkills.length,
        cellSize: SKILL_BADGE_SIZE,
        bottomGap: SKILL_GRID_BOTTOM_GAP,
      })

      killAnimations()

      hardSkills.forEach((hardSkill, skillIndex) => {
        const hardSkillEl = document.getElementById(
          `hard-skill-${hardSkill.id}`,
        )
        if (hardSkillEl) {
          const position = layout.positions[skillIndex]
          animationsRef.current[`hard-skill-${hardSkill.id}`] = gsap.to(
            hardSkillEl,
            {
              x: position.x,
              y: position.y,
              duration,
              ease: 'power2.out',
              overwrite: true,
            },
          )
        }
      })

      if (hardSkillsSectionBottomRef.current) {
        hardSkillsSectionBottomRef.current.style.minHeight = `${layout.requiredHeight}px`
      }
    },
    [
      hardSkills,
      hardSkillsSectionBottomRef,
      hardSkillsSectionRef,
      killAnimations,
    ],
  )

  useEffect(() => {
    return killAnimations
  }, [killAnimations])

  return { organizeHardSkills }
}
