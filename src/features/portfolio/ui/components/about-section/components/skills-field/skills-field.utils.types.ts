export interface CalculateSkillGridPositionsInput {
  readonly containerWidth: number
  readonly bottomAreaTop: number
  readonly skillCount: number
  readonly cellSize: number
  readonly bottomGap: number
}

export interface SkillGridPosition {
  readonly x: number
  readonly y: number
}

export interface SkillGridLayout {
  readonly positions: readonly SkillGridPosition[]
  readonly requiredHeight: number
}

export interface SkillFloatingBounds {
  readonly maxX: number
  readonly maxY: number
}

export interface SkillFloatingConfig {
  readonly minSpeed: number
  readonly maxSpeed: number
  readonly minSteeringInterval: number
  readonly maxSteeringInterval: number
  readonly maxTurnAngle: number
  readonly turnResponsiveness: number
  readonly edgeMargin: number
  readonly maxFrameDelta: number
  readonly spacing: number
}

export interface SkillFloatingState extends SkillGridPosition {
  readonly velocityX: number
  readonly velocityY: number
  readonly speed: number
  readonly targetDirection: number
  readonly steeringRemaining: number
}

export interface CreateSkillFloatingStatesInput {
  readonly containerWidth: number
  readonly containerHeight: number
  readonly skillCount: number
  readonly skillSize: number
  readonly config: SkillFloatingConfig
  readonly random: () => number
}

export interface AdvanceSkillFloatingStateInput {
  readonly state: SkillFloatingState
  readonly bounds: SkillFloatingBounds
  readonly deltaSeconds: number
  readonly config: SkillFloatingConfig
  readonly random: () => number
}

export interface ResizeSkillFloatingStateInput {
  readonly state: SkillFloatingState
  readonly previousBounds: SkillFloatingBounds
  readonly bounds: SkillFloatingBounds
}
