export const SKILL_BADGE_SIZE = 120
export const SKILL_GRID_BOTTOM_GAP = 40

// Speeds are CSS pixels per second; intervals and deltas are seconds.
export const SKILL_FLOATING_CONFIG = {
  minSpeed: 8,
  maxSpeed: 16,
  minSteeringInterval: 4,
  maxSteeringInterval: 8,
  maxTurnAngle: Math.PI / 3,
  turnResponsiveness: 1.5,
  edgeMargin: 80,
  maxFrameDelta: 0.05,
  spacing: 20,
} as const
