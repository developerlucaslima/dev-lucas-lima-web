import assert from 'node:assert/strict'
import test from 'node:test'

import {
  SKILL_BADGE_SIZE,
  SKILL_FLOATING_CONFIG,
  SKILL_GRID_BOTTOM_GAP,
} from '../src/features/portfolio/ui/components/about-section/components/skills-field/skills-field.constants.ts'
import {
  advanceSkillFloatingState,
  calculateSkillGridPositions,
  createSkillFloatingStates,
  getSkillFloatingBounds,
  resizeSkillFloatingState,
} from '../src/features/portfolio/ui/components/about-section/components/skills-field/skills-field.utils.ts'

test('centralizes the final row of a skill grid', () => {
  const layout = calculateSkillGridPositions({
    containerWidth: 360,
    bottomAreaTop: 200,
    skillCount: 4,
    cellSize: 120,
    bottomGap: SKILL_GRID_BOTTOM_GAP,
  })

  assert.deepEqual(layout.positions, [
    { x: 0, y: 240 },
    { x: 120, y: 240 },
    { x: 240, y: 240 },
    { x: 120, y: 360 },
  ])
  assert.equal(layout.requiredHeight, 280)
  for (const position of layout.positions) {
    assert.ok(position.y + 120 <= 200 + layout.requiredHeight)
  }
})

test('returns an empty layout when skill count or dimensions are invalid', () => {
  const emptyLayout = calculateSkillGridPositions({
    containerWidth: -20,
    bottomAreaTop: -10,
    skillCount: -1,
    cellSize: 0,
    bottomGap: SKILL_GRID_BOTTOM_GAP,
  })

  assert.deepEqual(emptyLayout, { positions: [], requiredHeight: 0 })
})

function seededRandom(seed) {
  return () => {
    seed = (1664525 * seed + 1013904223) >>> 0
    return seed / 2 ** 32
  }
}

function initialStates(width, height, count, random = seededRandom(42)) {
  return createSkillFloatingStates({
    containerWidth: width,
    containerHeight: height,
    skillCount: count,
    skillSize: SKILL_BADGE_SIZE,
    config: SKILL_FLOATING_CONFIG,
    random,
  })
}

test('distributes initial skills without overlap when the area has room', () => {
  const states = initialStates(1200, 1000, 10)
  for (const [index, state] of states.entries()) {
    assert.ok(state.x >= 0 && state.x <= 1080)
    assert.ok(state.y >= 0 && state.y <= 880)
    for (const other of states.slice(index + 1)) {
      assert.ok(
        Math.abs(state.x - other.x) >= SKILL_BADGE_SIZE ||
          Math.abs(state.y - other.y) >= SKILL_BADGE_SIZE,
      )
    }
  }
  assert.ok(new Set(states.map(({ x }) => Math.floor(x / 300))).size >= 3)
  assert.ok(new Set(states.map(({ y }) => Math.floor(y / 250))).size >= 3)
})

test('keeps three minutes of drift bounded and free of position jumps', () => {
  const random = seededRandom(1234)
  let states = initialStates(1200, 1000, 10, random)
  const bounds = { maxX: 1080, maxY: 880 }
  for (let frame = 0; frame < 180 * 60; frame++) {
    states = states.map((state) => {
      const next = advanceSkillFloatingState({
        state,
        bounds,
        deltaSeconds: 1 / 60,
        config: SKILL_FLOATING_CONFIG,
        random,
      })
      assert.ok(next.x >= 0 && next.x <= bounds.maxX)
      assert.ok(next.y >= 0 && next.y <= bounds.maxY)
      assert.ok(
        Math.hypot(next.x - state.x, next.y - state.y) <=
          SKILL_FLOATING_CONFIG.maxSpeed / 60 + 1e-6,
      )
      return next
    })
    assert.equal(states.filter(({ x, y }) => x === 0 && y === 0).length, 0)
  }
})

test('drifts by elapsed time rather than frame count and caps long frames', () => {
  const state = {
    ...initialStates(1200, 1000, 1)[0],
    x: 400,
    y: 400,
    velocityX: 12,
    velocityY: 0,
    speed: 12,
    targetDirection: 0,
    steeringRemaining: 100,
  }
  const advance = (current, deltaSeconds) =>
    advanceSkillFloatingState({
      state: current,
      bounds: { maxX: 1080, maxY: 880 },
      deltaSeconds,
      config: SKILL_FLOATING_CONFIG,
      random: () => 0.5,
    })
  let at60 = state
  let at30 = state
  for (let frame = 0; frame < 60; frame++) at60 = advance(at60, 1 / 60)
  for (let frame = 0; frame < 30; frame++) at30 = advance(at30, 1 / 30)
  assert.ok(Math.abs(at60.x - 412) < 1e-6)
  assert.ok(Math.abs(at60.x - at30.x) < 1e-6)
  assert.ok(advance(state, 60).x - state.x <= 12 * 0.05 + 1e-6)
  assert.deepEqual(advance(state, 0), state)
  assert.deepEqual(advance(state, Number.NaN), state)
})

test('steers inward gradually before reaching a boundary', () => {
  const state = {
    ...initialStates(1200, 1000, 1)[0],
    x: 40,
    y: 400,
    velocityX: -12,
    velocityY: 0,
    speed: 12,
    targetDirection: Math.PI,
    steeringRemaining: 100,
  }
  const next = advanceSkillFloatingState({
    state,
    bounds: { maxX: 1080, maxY: 880 },
    deltaSeconds: 1 / 60,
    config: SKILL_FLOATING_CONFIG,
    random: () => 0.5,
  })
  assert.ok(next.velocityX > state.velocityX && next.velocityX < 0)
  assert.ok(Math.cos(next.targetDirection) > 0)
  assert.ok(Math.abs(next.x - state.x) < 1)
})

test('preserves relative position and momentum when resizing', () => {
  const state = { ...initialStates(1200, 1000, 1)[0], x: 500, y: 250 }
  const next = resizeSkillFloatingState({
    state,
    previousBounds: { maxX: 1000, maxY: 500 },
    bounds: { maxX: 200, maxY: 1000 },
  })
  assert.equal(next.x, 100)
  assert.equal(next.y, 500)
  assert.equal(next.velocityX, state.velocityX)
  assert.equal(next.velocityY, state.velocityY)
})

test('handles empty and undersized areas without invalid positions', () => {
  assert.deepEqual(initialStates(100, 100, 0), [])
  const bounds = getSkillFloatingBounds({
    containerWidth: 40,
    containerHeight: 30,
    skillSize: SKILL_BADGE_SIZE,
  })
  const next = advanceSkillFloatingState({
    state: initialStates(40, 30, 1)[0],
    bounds,
    deltaSeconds: 1 / 60,
    config: SKILL_FLOATING_CONFIG,
    random: () => 0.5,
  })
  assert.equal(next.x, 0)
  assert.equal(next.y, 0)
  assert.equal(next.velocityX, 0)
  assert.equal(next.velocityY, 0)
})
