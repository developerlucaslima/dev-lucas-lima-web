import assert from 'node:assert/strict'
import test from 'node:test'

import {
  calculateSkillGridPositions,
  generateSkillFloatingTargets,
} from '../src/features/portfolio/ui/components/about-section/components/skills-field/skills-field.utils.ts'

test('centralizes the final row of a skill grid', () => {
  const layout = calculateSkillGridPositions({
    containerWidth: 360,
    bottomAreaTop: 200,
    skillCount: 4,
    cellSize: 120,
  })

  assert.deepEqual(layout.positions, [
    { x: 0, y: 240 },
    { x: 120, y: 240 },
    { x: 240, y: 240 },
    { x: 120, y: 360 },
  ])
  assert.equal(layout.requiredHeight, 240)
})

test('returns an empty layout when skill count or dimensions are invalid', () => {
  const emptyLayout = calculateSkillGridPositions({
    containerWidth: -20,
    bottomAreaTop: -10,
    skillCount: -1,
    cellSize: 0,
  })

  assert.deepEqual(emptyLayout, { positions: [], requiredHeight: 0 })
})

test('generates bounded floating targets from an injected random source', () => {
  const values = [0, 0.5, 0.25, 1, 0.75, 0.5]
  let randomIndex = 0

  const targets = generateSkillFloatingTargets({
    containerWidth: 200,
    containerHeight: 160,
    skillCount: 2,
    skillSize: 120,
    random: () => values[randomIndex++],
  })

  assert.deepEqual(targets, [
    { x: 0, y: 20, duration: 15 },
    { x: 80, y: 30, duration: 20 },
  ])
})

test('keeps floating targets inside zero-sized available bounds', () => {
  const targets = generateSkillFloatingTargets({
    containerWidth: 40,
    containerHeight: 30,
    skillCount: 1,
    skillSize: 120,
    random: () => 0.5,
  })

  assert.deepEqual(targets, [{ x: 0, y: 0, duration: 20 }])
})
