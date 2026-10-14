import {
  MAX_STAR_COUNT,
  STAR_AREA_PER_PARTICLE,
} from '../space-background.constants'

export function calculateStarCount(width: number, height: number) {
  if (!Number.isFinite(width) || !Number.isFinite(height)) return 0

  const viewportArea = Math.max(0, width) * Math.max(0, height)

  return Math.min(
    MAX_STAR_COUNT,
    Math.floor(viewportArea / STAR_AREA_PER_PARTICLE),
  )
}
