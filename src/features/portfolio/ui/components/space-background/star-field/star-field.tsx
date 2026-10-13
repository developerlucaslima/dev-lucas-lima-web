'use client'

import { useStarField } from './hooks/use-star-field'
import { starFieldStyles } from './star-field.styles'

export function StarField() {
  const { containerRef, isDocumentVisible, starElementsRef, stars } =
    useStarField()

  return (
    <div
      ref={containerRef}
      className={`${starFieldStyles.root} ${isDocumentVisible ? '' : starFieldStyles.paused}`}
    >
      {stars.map((star, index) => (
        <div
          key={index}
          ref={(element) => {
            starElementsRef.current[index] = element
          }}
          className={starFieldStyles.star}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            zIndex: Math.floor(star.depth),
          }}
        />
      ))}
    </div>
  )
}
