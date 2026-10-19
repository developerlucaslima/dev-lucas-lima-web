import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { education } from '../src/features/portfolio/content/education.data.ts'
import {
  formatProfessionalDate,
  formatProfessionalPeriod,
} from '../src/features/portfolio/content/format-professional-period.ts'
import { personalProjects } from '../src/features/portfolio/content/personal-projects.data.ts'
import { hardSkills } from '../src/features/portfolio/content/portfolio-profile.data.ts'
import { professionalExperiences } from '../src/features/portfolio/content/professional-experiences.data.ts'

test('professional periods preserve known precision and open-ended employment', () => {
  assert.equal(formatProfessionalDate('2025', 'en-US'), '2025')
  assert.equal(formatProfessionalDate('2025', 'pt-BR'), '2025')
  assert.equal(formatProfessionalDate('2025-09', 'en-US'), 'Sep 2025')
  assert.match(formatProfessionalDate('2025-09', 'pt-BR'), /set.*2025/)
  assert.equal(
    formatProfessionalPeriod('2025-09', undefined, 'en-US', 'present'),
    'Sep 2025 – present',
  )
  assert.match(
    formatProfessionalPeriod('2025-09', undefined, 'pt-BR', 'atual'),
    /set.*2025 – atual/,
  )
  for (const invalid of ['2025-00', '2025-13', '2025-09-01', 'unknown']) {
    assert.throws(() => formatProfessionalDate(invalid, 'en-US'), RangeError)
  }
  assert.throws(
    () => formatProfessionalPeriod('2025-09', '2024-01', 'en-US', 'present'),
    RangeError,
  )
})

test('both languages cover every experience and project without duplicating stable facts', async () => {
  for (const locale of ['en-US', 'pt-BR']) {
    const { Portfolio } = JSON.parse(
      await readFile(
        new URL(`../src/i18n/messages/${locale}.json`, import.meta.url),
        'utf8',
      ),
    )
    assert.deepEqual(
      Object.keys(Portfolio.journey.experiences).sort(),
      professionalExperiences.map(({ id }) => id).sort(),
    )
    assert.deepEqual(
      Object.keys(Portfolio.products.items).sort(),
      personalProjects.map(({ id }) => id).sort(),
    )
    for (const experience of Object.values(Portfolio.journey.experiences)) {
      assert.ok(experience.title && experience.summary)
      for (const fact of ['date', 'start', 'end', 'href', 'company']) {
        assert.ok(!(fact in experience), `${fact} belongs in shared facts`)
      }
    }
    for (const project of personalProjects) {
      assert.ok(Portfolio.products.statuses[project.status])
      const labels = Portfolio.products.items[project.id].links
      assert.deepEqual(
        Object.keys(labels).sort(),
        project.links.map(({ id }) => id).sort(),
      )
      for (const link of project.links) {
        assert.ok(labels[link.id]?.trim())
        assert.equal(new URL(link.href).protocol, 'https:')
      }
    }
    const { education: educationCopy, languages } =
      Portfolio.professionalSummary
    assert.deepEqual(
      Object.keys(educationCopy.complementary.courses).sort(),
      education.complementary.courses.map(({ id }) => id).sort(),
    )
    assert.match(languages.items.join(' '), /B1/)
    assert.doesNotMatch(languages.items.join(' '), /C1|C2/)
    for (const fact of ['href', 'score', 'level', 'issuedIn']) {
      assert.ok(!(fact in languages.certificate), `${fact} is a shared fact`)
    }
  }
})

test('shared records have unique IDs, valid periods, and no invented completion month', () => {
  assert.equal(
    new Set(professionalExperiences.map(({ id }) => id)).size,
    professionalExperiences.length,
  )
  assert.equal(new Set(hardSkills.map(({ id }) => id)).size, hardSkills.length)
  for (const experience of professionalExperiences) {
    assert.doesNotThrow(() =>
      formatProfessionalPeriod(
        experience.start,
        experience.end,
        'en-US',
        'present',
      ),
    )
  }
  assert.match(education.completedIn, /^\d{4}$/)
  for (const course of education.complementary.courses) {
    assert.match(course.completedIn, /^\d{4}$/)
  }
  assert.equal(education.status, 'completed')
  assert.equal(personalProjects[0].status, 'in-development')
})

test('published catalog does not invent a project start or an available diploma', () => {
  const designSystem = personalProjects.find(({ id }) => id === 'design-system')
  assert.equal(designSystem.status, 'catalog-published')
  assert.equal('start' in designSystem, false)
  assert.equal(education.diplomaHref, undefined)
  assert.equal(new URL(education.href).hostname, 'descomplica.com.br')
  assert.equal(
    new URL(education.complementary.href).hostname,
    'www.rocketseat.com.br',
  )
})
