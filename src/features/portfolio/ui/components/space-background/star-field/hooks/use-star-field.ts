'use client'

import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

import type { Star } from '../star-field.types'
import { calculateStarCount } from '../star-field.utils'

function createStars(width: number, height: number): Star[] {
  return Array.from({ length: calculateStarCount(width, height) }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.7 + 0.3,
    animationDuration: Math.random() * 3 + 2,
    depth: Math.random() * 5 + 1,
  }))
}

export function useStarField() {
  const [stars, setStars] = useState<Star[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const starElementsRef = useRef<Array<HTMLDivElement | null>>([])
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isDocumentVisible, setIsDocumentVisible] = useState(true)

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden)
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)

    return () =>
      document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    let resizeFrame = 0

    const regenerateStars = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame)

      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0
        setStars(createStars(window.innerWidth, window.innerHeight))
      })
    }

    regenerateStars()
    window.addEventListener('resize', regenerateStars, { passive: true })

    return () => {
      window.removeEventListener('resize', regenerateStars)
      if (resizeFrame) cancelAnimationFrame(resizeFrame)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (
      !container ||
      stars.length === 0 ||
      prefersReducedMotion ||
      !isDocumentVisible
    )
      return

    const starTargets = stars.flatMap((star, index) => {
      const element = starElementsRef.current[index]
      return element ? [{ element, star }] : []
    })
    const tweens: gsap.core.Tween[] = []
    const animatedStars: Array<{
      depth: number
      moveX: ReturnType<typeof gsap.quickTo>
      moveY: ReturnType<typeof gsap.quickTo>
    }> = []
    let lastPointerPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    const context = gsap.context(() => {
      starTargets.forEach(({ element, star }) => {
        const moveX = gsap.quickTo(element, 'x', {
          duration: 0.5,
          ease: 'power2.out',
        })
        const moveY = gsap.quickTo(element, 'y', {
          duration: 0.5,
          ease: 'power2.out',
        })
        tweens.push(moveX.tween, moveY.tween)

        animatedStars.push({
          depth: star.depth,
          moveX,
          moveY,
        })
      })
    }, container)

    const updateParallax = (clientX: number, clientY: number) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      if (width === 0 || height === 0) return

      const normalizedX = ((clientX - left) / width) * 2 - 1
      const normalizedY = ((clientY - top) / height) * 2 - 1

      animatedStars.forEach(({ depth, moveX, moveY }) => {
        const parallaxFactor = (1 / depth) * 20
        moveX(normalizedX * -parallaxFactor)
        moveY(normalizedY * -parallaxFactor)
      })
    }

    const handleMouseMove = (event: MouseEvent) => {
      lastPointerPosition = { x: event.clientX, y: event.clientY }
      if (!document.hidden) {
        updateParallax(event.clientX, event.clientY)
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tweens.forEach((tween) => tween.pause())
        return
      }

      updateParallax(lastPointerPosition.x, lastPointerPosition.y)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      context.revert()
    }
  }, [isDocumentVisible, prefersReducedMotion, stars])

  return { containerRef, isDocumentVisible, starElementsRef, stars }
}
