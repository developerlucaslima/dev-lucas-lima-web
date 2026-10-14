import type { CSSProperties } from 'react'

export interface ShootingStar {
  readonly id: number
  readonly startX: number
  readonly startY: number
  readonly duration: number
  readonly size: number
  readonly angle: number
  readonly distance: number
}

export interface ShootingStarStyles extends CSSProperties {
  readonly '--shooting-star-angle': string
  readonly '--shooting-star-distance': string
  readonly '--shooting-star-duration': string
}
