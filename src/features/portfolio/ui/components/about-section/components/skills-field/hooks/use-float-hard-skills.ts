'use client'

import { gsap } from 'gsap'
import { useCallback, useEffect, useRef } from 'react'

import { SKILL_BADGE_SIZE } from '../skills-field.constants'
import { generateSkillFloatingTargets } from '../skills-field.utils'
import type { UseFloatHardSkillsProps } from './use-float-hard-skills.types'

export function useFloatHardSkills({
  hardSkills,
  hardSkillsSectionRef,
}: UseFloatHardSkillsProps) {
  const animationsRef = useRef<Record<string, gsap.core.Tween>>({})

  const killAnimations = useCallback(() => {
    Object.values(animationsRef.current).forEach((tween) => tween.kill())
    animationsRef.current = {}
  }, [])

  const floatHardSkills = useCallback(() => {
    if (!hardSkillsSectionRef.current) return

    const container = hardSkillsSectionRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const targets = generateSkillFloatingTargets({
      containerWidth,
      containerHeight,
      skillCount: hardSkills.length,
      skillSize: SKILL_BADGE_SIZE,
      random: Math.random,
    })

    killAnimations()

    hardSkills.forEach((hardSkill, skillIndex) => {
      const target = targets[skillIndex]
      animationsRef.current[`hard-skill-${hardSkill.id}`] = gsap.to(
        `#hard-skill-${hardSkill.id}`,
        {
          x: target.x,
          y: target.y,
          duration: target.duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          overwrite: true,
        },
      )
    })
  }, [hardSkills, hardSkillsSectionRef, killAnimations])

  useEffect(() => {
    return killAnimations
  }, [killAnimations])

  return { floatHardSkills }
}
