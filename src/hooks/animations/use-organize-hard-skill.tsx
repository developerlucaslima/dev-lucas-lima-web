'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import type { HardSkillType } from '@/components/ui/hard-skills'

// TODO: max width 1024px

interface UseOrganizeHardSkillsProps {
  hardSkills: HardSkillType[]
  hardSkillsSectionRef: React.RefObject<HTMLDivElement | null>
  hardSkillsSectionBottomRef: React.RefObject<HTMLDivElement | null>
}

export function useOrganizeHardSkills({
  hardSkills,
  hardSkillsSectionRef,
  hardSkillsSectionBottomRef,
}: UseOrganizeHardSkillsProps) {
  const animationsRef = useRef<Record<string, gsap.core.Tween>>({})

  const killAnimations = () => {
    Object.values(animationsRef.current).forEach((tween) => tween.kill())
    animationsRef.current = {}
  }

  const organizeHardSkills = (duration = 1) => {
    const containerWidth = hardSkillsSectionRef.current?.clientWidth || 0
    const cellSize = 120 // each hardSkill cell's width/height
    const hardSkillPerRow = Math.max(1, Math.floor(containerWidth / cellSize))
    const bottomAreaTop = hardSkillsSectionBottomRef.current?.offsetTop || 0

    killAnimations()

    hardSkills.forEach((hardSkill, id) => {
      const row = Math.floor(id / hardSkillPerRow)
      // Determine if it's the last row and calculate hardSkill count accordingly
      const isLastRow =
        row === Math.floor((hardSkills.length - 1) / hardSkillPerRow)
      const rowHardSkillCount =
        isLastRow && hardSkills.length % hardSkillPerRow !== 0
          ? hardSkills.length % hardSkillPerRow
          : hardSkillPerRow

      // Calculate startX for the current row
      const rowStartX = (containerWidth - rowHardSkillCount * cellSize) / 2
      const col = id % hardSkillPerRow
      const baseY = bottomAreaTop + row * cellSize + 40

      // Get the hardSkill element and its dimensions
      const hardSkillEl = document.getElementById(`hardSkill-${hardSkill.id}`)
      if (hardSkillEl) {
        const { width: hardSkillWidth, height: hardSkillHeight } =
          hardSkillEl.getBoundingClientRect()
        // Calculate offsets to center the hardSkill within its cell
        const xOffset = (cellSize - hardSkillWidth) / 2
        const yOffset = (cellSize - hardSkillHeight) / 2

        animationsRef.current[`hardSkill-${hardSkill.id}`] = gsap.to(
          hardSkillEl,
          {
            x: rowStartX + col * cellSize + xOffset,
            y: baseY + yOffset,
            duration,
            ease: 'power2.out',
            overwrite: true,
          },
        )
      }
    })

    // Adjust the bottom area height
    const rows = Math.ceil(hardSkills.length / hardSkillPerRow)
    const requiredHeight = rows * cellSize
    if (hardSkillsSectionBottomRef.current) {
      hardSkillsSectionBottomRef.current.style.minHeight = `${requiredHeight}px`
    }
  }

  useEffect(() => {
    return () => {
      killAnimations()
    }
  }, [])

  return { organizeHardSkills }
}
