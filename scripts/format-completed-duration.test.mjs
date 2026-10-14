import assert from 'node:assert/strict'
import test from 'node:test'

import { formatCompletedDuration } from '../src/features/portfolio/content/format-completed-duration.ts'

test('formats completed duration in English', () => {
  assert.equal(
    formatCompletedDuration({ years: 1, months: 0 }, 'en-US'),
    '1 year',
  )
  assert.equal(
    formatCompletedDuration({ years: 2, months: 3 }, 'en-US'),
    '2 years and 3 months',
  )
})

test('formats completed duration in Brazilian Portuguese', () => {
  assert.equal(
    formatCompletedDuration({ years: 1, months: 1 }, 'pt-BR'),
    '1 ano e 1 mês',
  )
  assert.equal(
    formatCompletedDuration({ years: 2, months: 3 }, 'pt-BR'),
    '2 anos e 3 meses',
  )
  assert.equal(
    formatCompletedDuration({ years: 0, months: 0 }, 'pt-BR'),
    '0 meses',
  )
})
