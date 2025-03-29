'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import type { BubbleProps } from '@/components/ui/bubble'

interface UseOrganizeBubblesProps {
  bubbles: BubbleProps[]
  bubblesSectionRef: React.RefObject<HTMLDivElement | null>
  bubblesSectionBottomRef: React.RefObject<HTMLDivElement | null>
}

export function useOrganizeBubbles({
  bubbles,
  bubblesSectionRef,
  bubblesSectionBottomRef,
}: UseOrganizeBubblesProps) {
  const animationsRef = useRef<Record<string, gsap.core.Tween>>({})

  const killAnimations = () => {
    Object.values(animationsRef.current).forEach((tween) => tween.kill())
    animationsRef.current = {}
  }

  const organizeBubbles = (duration = 1) => {
    const containerWidth = bubblesSectionRef.current?.clientWidth || 0
    const cellSize = 120 // each bubble cell's width/height
    const bubblesPerRow = Math.max(1, Math.floor(containerWidth / cellSize))
    const bottomAreaTop = bubblesSectionBottomRef.current?.offsetTop || 0

    killAnimations()

    bubbles.forEach((bubble, id) => {
      const row = Math.floor(id / bubblesPerRow)
      // Determine if it's the last row and calculate bubble count accordingly
      const isLastRow = row === Math.floor((bubbles.length - 1) / bubblesPerRow)
      const rowBubbleCount =
        isLastRow && bubbles.length % bubblesPerRow !== 0
          ? bubbles.length % bubblesPerRow
          : bubblesPerRow

      // Calculate startX for the current row
      const rowStartX = (containerWidth - rowBubbleCount * cellSize) / 2
      const col = id % bubblesPerRow
      const baseY = bottomAreaTop + row * cellSize + 40

      // Get the bubble element and its dimensions
      const bubbleEl = document.getElementById(`bubble-${bubble.id}`)
      if (bubbleEl) {
        const { width: bubbleWidth, height: bubbleHeight } =
          bubbleEl.getBoundingClientRect()
        // Calculate offsets to center the bubble within its cell
        const xOffset = (cellSize - bubbleWidth) / 2
        const yOffset = (cellSize - bubbleHeight) / 2

        animationsRef.current[`bubble-${bubble.id}`] = gsap.to(bubbleEl, {
          x: rowStartX + col * cellSize + xOffset,
          y: baseY + yOffset,
          duration,
          ease: 'power2.out',
          overwrite: true,
        })
      }
    })

    // Adjust the bottom area height
    const rows = Math.ceil(bubbles.length / bubblesPerRow)
    const requiredHeight = rows * cellSize
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
