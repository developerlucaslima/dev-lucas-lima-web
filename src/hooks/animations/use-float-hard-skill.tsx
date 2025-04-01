'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import type { HardSkillType } from '@/components/ui/hard-skills'

interface UseFloatHardSkillsProps {
  hardSkills: HardSkillType[]
  hardSkillsSectionRef: React.RefObject<HTMLDivElement | null>
}

export function useFloatHardSkills({
  hardSkills,
  hardSkillsSectionRef,
}: UseFloatHardSkillsProps) {
  const animationsRef = useRef<Record<string, gsap.core.Tween>>({})

  const killAnimations = () => {
    Object.values(animationsRef.current).forEach((tween) => tween.kill())
    animationsRef.current = {}
  }

  const floatHardSkills = () => {
    if (!hardSkillsSectionRef.current) return

    // Use client dimensions of the container for inner dimensions.
    const container = hardSkillsSectionRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    // Define the hardSkill size (should match the HardSkill component)
    const hardSkillSize = 20

    killAnimations()

    hardSkills.forEach((hardSkill) => {
      const randomX = Math.random() * (containerWidth - hardSkillSize)
      const randomY = Math.random() * (containerHeight - hardSkillSize)

      animationsRef.current[`hardSkill-${hardSkill.id}`] = gsap.to(
        `#hardSkill-${hardSkill.id}`,
        {
          x: randomX,
          y: randomY,
          duration: 10 + Math.random() * 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          overwrite: true,
        },
      )
    })
  }

  useEffect(() => {
    return () => {
      killAnimations()
    }
  }, [])

  return { floatHardSkills }
}
