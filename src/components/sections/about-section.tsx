'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import type { HardSkillContent } from '@/features/portfolio/content/portfolio-content.types'
import { useFloatHardSkills } from '@/hooks/animations/use-float-hard-skills'
import { useOrganizeHardSkills } from '@/hooks/animations/use-organize-hard-skills'
import { useWindowResize } from '@/hooks/use-window-resize'

import { HardSkill } from '../ui/hard-skills'

interface AboutSectionProps {
  readonly children: ReactNode
  readonly hardSkills: readonly HardSkillContent[]
}

export function AboutSection({ children, hardSkills }: AboutSectionProps) {
  const hardSkillsConfig = hardSkills
  const hardSkillsSectionRef = useRef<HTMLDivElement | null>(null)
  const hardSkillsSectionBottomRef = useRef<HTMLDivElement | null>(null)

  const [isOrganized, setIsOrganized] = useState(true)

  // Attaches a resize event listener to the window
  useWindowResize({
    callback: isOrganized
      ? () => organizeHardSkills()
      : () => floatHardSkills(),
  })

  // Get animation functions from the separated hooks.
  const { organizeHardSkills } = useOrganizeHardSkills({
    hardSkills: hardSkillsConfig,
    hardSkillsSectionRef,
    hardSkillsSectionBottomRef,
  })

  const { floatHardSkills } = useFloatHardSkills({
    hardSkills: hardSkillsConfig,
    hardSkillsSectionRef,
  })

  // Trigger animations when isOrganized state or item count changes.
  useEffect(() => {
    if (isOrganized) {
      organizeHardSkills()
    } else {
      floatHardSkills()
    }
  }, [isOrganized, organizeHardSkills, floatHardSkills])

  const handleHardSkillClick = () => {
    setIsOrganized((prev) => !prev)
  }

  return (
    // Content Area
    <section
      id="about"
      ref={hardSkillsSectionRef}
      className="relative mb-10 flex min-h-screen flex-col items-center justify-center"
    >
      {/* Render each hard skill */}
      {hardSkillsConfig.map((hardSkill) => (
        <HardSkill
          key={hardSkill.name}
          id={hardSkill.id}
          onClick={handleHardSkillClick}
          isOrganized={isOrganized}
          name={hardSkill.name}
          iconKey={hardSkill.iconKey}
        />
      ))}

      {/* Content */}
      {children}

      {/* Bottom Area for layout adjustments */}
      <div
        ref={hardSkillsSectionBottomRef}
        className="mx-auto min-h-[120px] max-w-5xl"
      />
    </section>
  )
}
