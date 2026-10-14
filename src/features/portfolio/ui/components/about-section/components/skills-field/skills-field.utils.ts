export interface CalculateSkillGridPositionsInput {
  readonly containerWidth: number
  readonly bottomAreaTop: number
  readonly skillCount: number
  readonly cellSize: number
}

export interface SkillGridPosition {
  readonly x: number
  readonly y: number
}

export interface SkillGridLayout {
  readonly positions: readonly SkillGridPosition[]
  readonly requiredHeight: number
}

export function calculateSkillGridPositions({
  containerWidth,
  bottomAreaTop,
  skillCount,
  cellSize,
}: CalculateSkillGridPositionsInput): SkillGridLayout {
  const availableWidth = Math.max(0, Math.floor(containerWidth))
  const safeCellSize = Math.max(1, Math.floor(cellSize))
  const safeSkillCount = Math.max(0, Math.floor(skillCount))
  const safeBottomAreaTop = Math.max(0, bottomAreaTop)
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
      y: safeBottomAreaTop + row * safeCellSize + 40,
    }
  })

  return {
    positions,
    requiredHeight: rowCount * safeCellSize,
  }
}

export interface GenerateSkillFloatingTargetsInput {
  readonly containerWidth: number
  readonly containerHeight: number
  readonly skillCount: number
  readonly skillSize: number
  readonly random: () => number
}

export interface SkillFloatingTarget {
  readonly x: number
  readonly y: number
  readonly duration: number
}

export function generateSkillFloatingTargets({
  containerWidth,
  containerHeight,
  skillCount,
  skillSize,
  random,
}: GenerateSkillFloatingTargetsInput): readonly SkillFloatingTarget[] {
  const safeSkillSize = Math.max(0, skillSize)
  const availableWidth = Math.max(0, containerWidth - safeSkillSize)
  const availableHeight = Math.max(0, containerHeight - safeSkillSize)

  return Array.from({ length: Math.max(0, Math.floor(skillCount)) }, () => ({
    x: random() * availableWidth,
    y: random() * availableHeight,
    duration: 10 + random() * 20,
  }))
}
