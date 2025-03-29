'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import type { BubbleProps } from '@/components/ui/bubble'

interface UseFloatBubblesProps {
  bubbles: BubbleProps[]
  bubblesSectionRef: React.RefObject<HTMLDivElement | null>
}

export function useFloatBubbles({
  bubbles,
  bubblesSectionRef,
}: UseFloatBubblesProps) {
  const animationsRef = useRef<Record<string, gsap.core.Tween>>({})

  const killAnimations = () => {
    Object.values(animationsRef.current).forEach((tween) => tween.kill())
    animationsRef.current = {}
  }

  const floatBubbles = () => {
    if (!bubblesSectionRef.current) return

    // Use client dimensions of the container for inner dimensions.
    const container = bubblesSectionRef.current
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    // Define the bubble size (should match the Bubble component)
    const bubbleSize = 20

    killAnimations()

    bubbles.forEach((bubble) => {
      const randomX = Math.random() * (containerWidth - bubbleSize)
      const randomY = Math.random() * (containerHeight - bubbleSize)

      animationsRef.current[`bubble-${bubble.id}`] = gsap.to(
        `#bubble-${bubble.id}`,
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

  return { floatBubbles }
}
