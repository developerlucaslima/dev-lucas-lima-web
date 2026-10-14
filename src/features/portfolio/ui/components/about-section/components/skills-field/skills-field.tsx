'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { TooltipProvider } from '@/components/shared/tooltip-provider/tooltip-provider'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'
import { useWindowResize } from '@/hooks/use-window-resize'

import { SkillBadge } from './components/skill-badge/skill-badge'
import { useFloatHardSkills } from './hooks/use-float-hard-skills'
import { useOrganizeHardSkills } from './hooks/use-organize-hard-skills'
import { skillsFieldStyles } from './skills-field.styles'
import type { SkillsFieldProps } from './skills-field.types'

export function SkillsField({ children, hardSkills }: SkillsFieldProps) {
  const hardSkillsSectionRef = useRef<HTMLDivElement | null>(null)
  const hardSkillsSectionBottomRef = useRef<HTMLDivElement | null>(null)
  const [isOrganized, setIsOrganized] = useState(true)
  const prefersReducedMotion = usePrefersReducedMotion()

  const { organizeHardSkills } = useOrganizeHardSkills({
    hardSkills,
    hardSkillsSectionRef,
    hardSkillsSectionBottomRef,
  })
  const { floatHardSkills } = useFloatHardSkills({
    hardSkills,
    hardSkillsSectionRef,
  })

  const handleResize = useCallback(() => {
    if (prefersReducedMotion || isOrganized) {
      organizeHardSkills(prefersReducedMotion ? 0 : undefined)
      return
    }

    floatHardSkills()
  }, [floatHardSkills, isOrganized, organizeHardSkills, prefersReducedMotion])

  useWindowResize({ callback: handleResize })

  useEffect(() => {
    if (prefersReducedMotion) {
      organizeHardSkills(0)
      return
    }

    if (isOrganized) {
      organizeHardSkills()
      return
    }

    floatHardSkills()
  }, [floatHardSkills, isOrganized, organizeHardSkills, prefersReducedMotion])

  const handleSkillBadgeClick = useCallback(() => {
    if (prefersReducedMotion) return
    setIsOrganized((previousValue) => !previousValue)
  }, [prefersReducedMotion])

  return (
    <TooltipProvider>
      <div ref={hardSkillsSectionRef} className={skillsFieldStyles.root}>
        {hardSkills.map((hardSkill) => (
          <SkillBadge
            key={hardSkill.id}
            id={hardSkill.id}
            name={hardSkill.name}
            iconKey={hardSkill.iconKey}
            onClick={handleSkillBadgeClick}
            isOrganized={isOrganized}
            isMotionDisabled={prefersReducedMotion}
          />
        ))}
        {children}
        <div
          ref={hardSkillsSectionBottomRef}
          className={skillsFieldStyles.bottomSpacer}
        />
      </div>
    </TooltipProvider>
  )
}
