'use client'

import { useShootingStars } from './hooks/use-shooting-stars'
import { shootingStarsStyles } from './shooting-stars.styles'
import type { ShootingStarStyles } from './shooting-stars.types'

export function ShootingStars() {
  const shootingStars = useShootingStars()

  return (
    <div className={shootingStarsStyles.root}>
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className={shootingStarsStyles.anchor}
          style={{ left: `${star.startX}%`, top: `${star.startY}%` }}
        >
          <div
            className={shootingStarsStyles.trail}
            style={
              {
                height: `${star.size}px`,
                '--shooting-star-angle': `${(star.angle * 180) / Math.PI}deg`,
                '--shooting-star-distance': `${star.distance}vw`,
                '--shooting-star-duration': `${star.duration}s`,
                width: `${star.size * 3}px`,
              } as ShootingStarStyles
            }
          />
        </div>
      ))}
    </div>
  )
}
