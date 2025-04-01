'use client'

import { useEffect, useRef, useState } from 'react'

import { english } from '@/config/english-config'
import { useFloatHardSkills } from '@/hooks/animations/use-float-hard-skill'
import { useOrganizeHardSkills } from '@/hooks/animations/use-organize-hard-skill'
import { useWindowResize } from '@/hooks/use-window-resize'

import { AboutContent } from '../about-content'
import { HardSkills } from '../ui/hard-skills'

export function AboutSection() {
  const hardSkills = english.hardSkills
  const hardSkillsSectionRef = useRef<HTMLDivElement | null>(null)
  const hardSkillsSectionBottomRef = useRef<HTMLDivElement | null>(null)

  const hardSkillLength = hardSkills.length

  const [isOrganized, setIsOrganized] = useState(true)

  // It attaches a resize event listener to the window
  useWindowResize({
    callback: isOrganized
      ? () => organizeHardSkills()
      : () => floatHardSkills(),
  })

  // Get animation functions from the separated hooks.
  const { organizeHardSkills } = useOrganizeHardSkills({
    hardSkills,
    hardSkillsSectionRef,
    hardSkillsSectionBottomRef,
  })

  const { floatHardSkills } = useFloatHardSkills({
    hardSkills,
    hardSkillsSectionRef,
  })

  // Trigger animations when isOrganized state or hardSkill count changes.
  useEffect(() => {
    if (isOrganized) {
      organizeHardSkills()
    } else {
      floatHardSkills()
    }
  }, [isOrganized, hardSkillLength, organizeHardSkills, floatHardSkills])

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
      {/* Render each hardSkill */}
      {hardSkills.map((hardSkill) => (
        <HardSkills
          key={hardSkill.name}
          id={hardSkill.id}
          onClick={handleHardSkillClick}
          isOrganized={isOrganized}
          name={hardSkill.name}
          icon={hardSkill.icon}
        />
      ))}

      {/* Content */}
      <AboutContent />

      {/* Bottom Area for layout adjustments */}
      <div
        ref={hardSkillsSectionBottomRef}
        className="mx-auto min-h-[120px] max-w-5xl"
      />
    </section>
  )
}
