import type {
  AdvanceSkillFloatingStateInput,
  CalculateSkillGridPositionsInput,
  CreateSkillFloatingStatesInput,
  ResizeSkillFloatingStateInput,
  SkillFloatingBounds,
  SkillFloatingState,
  SkillGridLayout,
} from './skills-field.utils.types'

export function calculateSkillGridPositions({
  containerWidth,
  bottomAreaTop,
  skillCount,
  cellSize,
  bottomGap,
}: CalculateSkillGridPositionsInput): SkillGridLayout {
  const availableWidth = Math.max(0, Math.floor(containerWidth))
  const safeCellSize = Math.max(1, Math.floor(cellSize))
  const safeSkillCount = Math.max(0, Math.floor(skillCount))
  const safeBottomAreaTop = Math.max(0, bottomAreaTop)
  const safeBottomGap = Math.max(0, bottomGap)
  const skillsPerRow = Math.max(1, Math.floor(availableWidth / safeCellSize))
  const rowCount = Math.ceil(safeSkillCount / skillsPerRow)
  const positions = Array.from({ length: safeSkillCount }, (_, skillIndex) => {
    const row = Math.floor(skillIndex / skillsPerRow)
    const isLastRow = row === rowCount - 1
    const skillCountInLastRow = skillCount % skillsPerRow
    const skillsInRow =
      isLastRow && skillCountInLastRow > 0 ? skillCountInLastRow : skillsPerRow
    const rowStartX = (availableWidth - skillsInRow * safeCellSize) / 2
    const column = skillIndex % skillsPerRow

    return {
      x: rowStartX + column * safeCellSize,
      y: safeBottomAreaTop + row * safeCellSize + safeBottomGap,
    }
  })

  return {
    positions,
    requiredHeight: rowCount > 0 ? rowCount * safeCellSize + safeBottomGap : 0,
  }
}

export function getSkillFloatingBounds({
  containerWidth,
  containerHeight,
  skillSize,
}: Pick<
  CreateSkillFloatingStatesInput,
  'containerWidth' | 'containerHeight' | 'skillSize'
>): SkillFloatingBounds {
  const safeSkillSize = Math.max(0, skillSize)
  return {
    maxX: Math.max(0, containerWidth - safeSkillSize),
    maxY: Math.max(0, containerHeight - safeSkillSize),
  }
}

function clampPosition(value: number, maximum: number) {
  return Math.max(0, Math.min(maximum, value))
}

export function createSkillFloatingStates({
  containerWidth,
  containerHeight,
  skillCount,
  skillSize,
  config,
  random,
}: CreateSkillFloatingStatesInput): readonly SkillFloatingState[] {
  const count = Math.max(0, Math.floor(skillCount))
  const width = Math.max(0, containerWidth)
  const height = Math.max(0, containerHeight)
  const bounds = getSkillFloatingBounds({
    containerWidth: width,
    containerHeight: height,
    skillSize,
  })
  const columns = Math.max(
    1,
    Math.min(
      count,
      Math.floor(width / (skillSize + config.spacing)),
      Math.round(Math.sqrt((count * width) / Math.max(1, height))),
    ),
  )
  const rows = Math.max(1, Math.ceil(count / columns))
  const cellWidth = width / columns
  const cellHeight = height / rows
  const jitterX = Math.max(0, cellWidth - skillSize - config.spacing) / 2
  const jitterY = Math.max(0, cellHeight - skillSize - config.spacing) / 2

  return Array.from({ length: count }, (_, index) => {
    const row = Math.floor(index / columns)
    const column = index % columns
    const itemsInRow = Math.min(columns, count - row * columns)
    const rowStart = (width - itemsInRow * cellWidth) / 2
    const x =
      rowStart +
      (column + 0.5) * cellWidth -
      skillSize / 2 +
      (random() * 2 - 1) * jitterX
    const y =
      (row + 0.5) * cellHeight - skillSize / 2 + (random() * 2 - 1) * jitterY
    const targetDirection = random() * Math.PI * 2
    const speed =
      config.minSpeed + random() * (config.maxSpeed - config.minSpeed)
    return {
      x: clampPosition(x, bounds.maxX),
      y: clampPosition(y, bounds.maxY),
      velocityX: Math.cos(targetDirection) * speed,
      velocityY: Math.sin(targetDirection) * speed,
      speed,
      targetDirection,
      steeringRemaining:
        config.minSteeringInterval +
        random() * (config.maxSteeringInterval - config.minSteeringInterval),
    }
  })
}

export function advanceSkillFloatingState({
  state,
  bounds,
  deltaSeconds,
  config,
  random,
}: AdvanceSkillFloatingStateInput): SkillFloatingState {
  const delta = Number.isFinite(deltaSeconds)
    ? Math.max(0, Math.min(config.maxFrameDelta, deltaSeconds))
    : 0
  if (delta === 0) return state

  let targetDirection = state.targetDirection
  let steeringRemaining = state.steeringRemaining - delta
  if (steeringRemaining <= 0) {
    targetDirection += (random() * 2 - 1) * config.maxTurnAngle
    steeringRemaining =
      config.minSteeringInterval +
      random() * (config.maxSteeringInterval - config.minSteeringInterval)
  }

  let desiredX = Math.cos(targetDirection) * state.speed
  let desiredY = Math.sin(targetDirection) * state.speed
  const marginX = Math.min(config.edgeMargin, bounds.maxX / 3)
  const marginY = Math.min(config.edgeMargin, bounds.maxY / 3)
  if (state.x < marginX && desiredX < 0) desiredX = -desiredX
  if (state.x > bounds.maxX - marginX && desiredX > 0) desiredX = -desiredX
  if (state.y < marginY && desiredY < 0) desiredY = -desiredY
  if (state.y > bounds.maxY - marginY && desiredY > 0) desiredY = -desiredY
  if (bounds.maxX === 0) desiredX = 0
  if (bounds.maxY === 0) desiredY = 0
  targetDirection = Math.atan2(desiredY, desiredX)

  const smoothing = 1 - Math.exp(-config.turnResponsiveness * delta)
  let velocityX = state.velocityX + (desiredX - state.velocityX) * smoothing
  let velocityY = state.velocityY + (desiredY - state.velocityY) * smoothing
  const nextX = state.x + velocityX * delta
  const nextY = state.y + velocityY * delta
  if (nextX < 0) velocityX = Math.abs(velocityX)
  if (nextX > bounds.maxX) velocityX = -Math.abs(velocityX)
  if (nextY < 0) velocityY = Math.abs(velocityY)
  if (nextY > bounds.maxY) velocityY = -Math.abs(velocityY)

  return {
    ...state,
    x: clampPosition(nextX, bounds.maxX),
    y: clampPosition(nextY, bounds.maxY),
    velocityX: bounds.maxX === 0 ? 0 : velocityX,
    velocityY: bounds.maxY === 0 ? 0 : velocityY,
    targetDirection,
    steeringRemaining,
  }
}

export function resizeSkillFloatingState({
  state,
  previousBounds,
  bounds,
}: ResizeSkillFloatingStateInput): SkillFloatingState {
  return {
    ...state,
    x: clampPosition(
      previousBounds.maxX > 0
        ? (state.x / previousBounds.maxX) * bounds.maxX
        : bounds.maxX / 2,
      bounds.maxX,
    ),
    y: clampPosition(
      previousBounds.maxY > 0
        ? (state.y / previousBounds.maxY) * bounds.maxY
        : bounds.maxY / 2,
      bounds.maxY,
    ),
  }
}
