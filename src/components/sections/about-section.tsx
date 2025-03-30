'use client'

import { useEffect, useRef, useState } from 'react'

import { bubblesConfig } from '@/config/bubbles-config'
import { useFloatBubbles } from '@/hooks/animations/use-float-bubbles'
import { useOrganizeBubbles } from '@/hooks/animations/use-organize-bubbles'
import { useWindowResize } from '@/hooks/use-window-resize'

import { AboutContent } from '../about-content'
import { Bubble } from '../ui/bubble'

export function AboutSection() {
  const bubblesSectionRef = useRef<HTMLDivElement | null>(null)
  const bubblesSectionBottomRef = useRef<HTMLDivElement | null>(null)

  const bubbleLength = bubblesConfig.length

  const [isOrganized, setIsOrganized] = useState(false)

  // It attaches a resize event listener to the window
  useWindowResize({
    callback: isOrganized ? () => organizeBubbles() : () => floatBubbles(),
  })

  // Get animation functions from the separated hooks.
  const { organizeBubbles } = useOrganizeBubbles({
    bubbles: bubblesConfig,
    bubblesSectionRef,
    bubblesSectionBottomRef,
  })

  const { floatBubbles } = useFloatBubbles({
    bubbles: bubblesConfig,
    bubblesSectionRef,
  })

  // Trigger animations when isOrganized state or bubble count changes.
  useEffect(() => {
    if (isOrganized) {
      organizeBubbles()
    } else {
      floatBubbles()
    }
  }, [isOrganized, bubbleLength, organizeBubbles, floatBubbles])

  const handleBubbleClick = () => {
    setIsOrganized((prev) => !prev)
  }

  return (
    // Content Area
    <section
      id="about"
      ref={bubblesSectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Render each bubble */}
      {bubblesConfig.map((bubble) => (
        <Bubble
          key={bubble.name}
          id={bubble.id}
          initialX={bubble.initialX}
          initialY={bubble.initialY}
          onClick={handleBubbleClick}
          isOrganized={isOrganized}
          name={bubble.name}
          icon={bubble.icon}
        />
      ))}

      {/* Content */}
      <AboutContent />

      {/* Bottom Area for layout adjustments */}
      <div
        ref={bubblesSectionBottomRef}
        className="mx-auto min-h-[120px] max-w-5xl"
      />
    </section>
  )
}
