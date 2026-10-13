'use client'

import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

import type { ShootingStar } from '../shooting-stars.types'

export function useShootingStars() {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const shootingStarIdRef = useRef(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setShootingStars([])
      return
    }

    let disposed = false
    let creationTimer: ReturnType<typeof setTimeout> | undefined
    const removalTimers = new Map<number, ReturnType<typeof setTimeout>>()

    const clearTimers = () => {
      if (creationTimer) clearTimeout(creationTimer)
      creationTimer = undefined
      removalTimers.forEach((timer) => clearTimeout(timer))
      removalTimers.clear()
    }

    const scheduleNextShootingStar = () => {
      if (disposed) return

      creationTimer = setTimeout(createShootingStar, 200 + Math.random() * 1000)
    }

    const createShootingStar = () => {
      if (disposed) return

      if (Math.random() > 0.8) {
        const id = shootingStarIdRef.current++
        const duration = 0.6 + Math.random() * 2
        const shootingStar: ShootingStar = {
          id,
          startX: Math.random() * 100,
          startY: Math.random() * 40,
          duration,
          size: 1.5 + Math.random() * 1.5,
          angle: Math.PI / 4 + (Math.random() * Math.PI) / 2,
          distance: 30 + Math.random() * 40,
        }

        setShootingStars((currentStars) => [...currentStars, shootingStar])

        const removalTimer = setTimeout(
          () => {
            removalTimers.delete(id)
            if (disposed) return

            setShootingStars((currentStars) =>
              currentStars.filter((star) => star.id !== id),
            )
          },
          duration * 1000 + 100,
        )

        removalTimers.set(id, removalTimer)
      }

      scheduleNextShootingStar()
    }

    const handleVisibilityChange = () => {
      clearTimers()
      if (document.hidden) {
        setShootingStars([])
        return
      }

      creationTimer = setTimeout(
        createShootingStar,
        1000 + Math.random() * 2000,
      )
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    if (!document.hidden) handleVisibilityChange()

    return () => {
      disposed = true
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimers()
    }
  }, [prefersReducedMotion])

  return shootingStars
}
