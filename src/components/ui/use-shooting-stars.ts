import { useEffect, useRef, useState } from 'react'

interface ShootingStar {
  id: number
  startX: number
  startY: number
  endX: number
  endY: number
  duration: number
  size: number
  angle: number
  distance: number
}

export function useShootingStars() {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const shootingStarIdRef = useRef(0)

  useEffect(() => {
    let isDisposed = false
    const timerIds = new Set<number>()

    const schedule = (callback: () => void, delay: number) => {
      const timerId = window.setTimeout(() => {
        timerIds.delete(timerId)

        if (!isDisposed) {
          callback()
        }
      }, delay)

      timerIds.add(timerId)
    }

    const createShootingStar = () => {
      if (Math.random() > 0.8) {
        const id = shootingStarIdRef.current++
        const startX = Math.random() * 100
        const startY = Math.random() * 40
        const distance = 30 + Math.random() * 40
        const angle = Math.PI / 4 + (Math.random() * Math.PI) / 2
        const endX = startX + Math.cos(angle) * distance
        const endY = startY + Math.sin(angle) * distance
        const duration = 0.6 + Math.random() * 2
        const size = 1.5 + Math.random() * 1.5

        setShootingStars((previousStars) =>
          isDisposed
            ? previousStars
            : [
                ...previousStars,
                {
                  id,
                  startX,
                  startY,
                  endX,
                  endY,
                  duration,
                  size,
                  angle,
                  distance,
                },
              ],
        )

        schedule(
          () => {
            setShootingStars((previousStars) =>
              isDisposed
                ? previousStars
                : previousStars.filter((star) => star.id !== id),
            )
          },
          duration * 1000 + 100,
        )
      }

      schedule(createShootingStar, 200 + Math.random() * 1000)
    }

    schedule(createShootingStar, 1000 + Math.random() * 2000)

    return () => {
      isDisposed = true
      timerIds.forEach((timerId) => window.clearTimeout(timerId))
      timerIds.clear()
    }
  }, [])

  return shootingStars
}
