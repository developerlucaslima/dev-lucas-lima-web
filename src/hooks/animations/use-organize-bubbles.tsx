'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import type { BubbleProps } from '@/components/ui/bubble'

interface UseOrganizeBubblesProps {
  bubbles: BubbleProps[]
  bubblesSectionRef: React.RefObject<HTMLDivElement | null>
  bubblesSectionBottomRef: React.RefObject<HTMLDivElement | null>
  isOrganized: boolean
}

export function useOrganizeBubbles({
  bubbles,
  bubblesSectionRef,
  bubblesSectionBottomRef,
  isOrganized,
}: UseOrganizeBubblesProps) {
  const animationsRef = useRef<Record<string, gsap.core.Tween>>({})

  const killAnimations = () => {
    Object.values(animationsRef.current).forEach((tween) => tween.kill())
    animationsRef.current = {}
  }

  const organizeBubbles = (duration = 1) => {
    const containerWidth = bubblesSectionRef.current?.clientWidth || 0
    const bubbleSize = 120
    const bubblesPerRow = Math.max(1, Math.floor(containerWidth / bubbleSize))
    const bottomAreaTop = bubblesSectionBottomRef.current?.offsetTop || 0

    killAnimations()

    // Scroll into view if organized
    if (isOrganized && bubblesSectionRef.current) {
      bubblesSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    bubbles.forEach((bubble, id) => {
      const row = Math.floor(id / bubblesPerRow)
      // Determine if it's the last row and calculate bubble count accordingly
      const isLastRow = row === Math.floor((bubbles.length - 1) / bubblesPerRow)
      const rowBubbleCount =
        isLastRow && bubbles.length % bubblesPerRow !== 0
          ? bubbles.length % bubblesPerRow
          : bubblesPerRow

      // Calculate startX for the current row
      const rowStartX = (containerWidth - rowBubbleCount * bubbleSize) / 2
      const col = id % bubblesPerRow
      const yPosition = bottomAreaTop + row * bubbleSize + 40

      animationsRef.current[`bubble-${bubble.id}`] = gsap.to(
        `#bubble-${bubble.id}`,
        {
          x: rowStartX + col * bubbleSize,
          y: yPosition,
          duration,
          ease: 'power2.out',
          overwrite: true,
        },
      )
    })

    // Adjust the bottom area height
    const rows = Math.ceil(bubbles.length / bubblesPerRow)
    const requiredHeight = rows * bubbleSize
    if (bubblesSectionBottomRef.current) {
      bubblesSectionBottomRef.current.style.minHeight = `${requiredHeight}px`
    }
  }

  useEffect(() => {
    return () => {
      killAnimations()
    }
  }, [])

  return { organizeBubbles }
}
