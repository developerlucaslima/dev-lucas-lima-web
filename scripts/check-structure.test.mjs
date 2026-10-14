import assert from 'node:assert/strict'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'

import {
  findBoundaryViolations,
  findComponentLayoutViolations,
} from './check-structure.mjs'

async function withFixture(run) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'portfolio-structure-'))
  const files = []

  try {
    await mkdir(path.join(root, 'src', 'features', 'contact', 'data'), {
      recursive: true,
    })
    await mkdir(path.join(root, 'src', 'features', 'contact', 'ui'), {
      recursive: true,
    })
    await mkdir(path.join(root, 'src', 'lib'), { recursive: true })
    await writeFile(
      path.join(root, 'src', 'features', 'contact', 'data', 'sender.ts'),
      '',
    )

    files.push(
      path.join(root, 'src', 'features', 'contact', 'ui', 'form.tsx'),
      path.join(root, 'src', 'lib', 'format.ts'),
    )
    await writeFile(files[0], '')
    await writeFile(files[1], '')
    await run({ files, root })
  } finally {
    await rm(root, { recursive: true, force: true })
  }
}

test('rejects feature UI imports of data through relative paths', async () => {
  await withFixture(async ({ files, root }) => {
    await writeFile(files[0], "import { sender } from '../data/sender'\n")

    const violations = await findBoundaryViolations(files, root)

    assert.equal(violations.length, 1)
    assert.match(violations[0], /imports feature data directly/)
  })
})

test('rejects lib imports of features through aliases', async () => {
  await withFixture(async ({ files, root }) => {
    const featureContract = path.join(
      root,
      'src',
      'features',
      'contact',
      'contract.ts',
    )
    await writeFile(featureContract, '')
    await writeFile(
      files[1],
      "import type { Contact } from '@/features/contact/contract'\n",
    )

    const violations = await findBoundaryViolations(files, root)

    assert.equal(violations.length, 1)
    assert.match(violations[0], /imports a feature module/)
  })
})

test('allows UI imports of contracts and server actions', async () => {
  await withFixture(async ({ files, root }) => {
    await mkdir(path.join(root, 'src', 'features', 'contact', 'contracts'), {
      recursive: true,
    })
    await mkdir(path.join(root, 'src', 'features', 'contact', 'actions'), {
      recursive: true,
    })
    await writeFile(
      path.join(
        root,
        'src',
        'features',
        'contact',
        'contracts',
        'contact.types.ts',
      ),
      '',
    )
    await writeFile(
      path.join(root, 'src', 'features', 'contact', 'actions', 'submit.ts'),
      '',
    )
    await writeFile(
      files[0],
      "import type { Contact } from '../contracts/contact.types'\nimport { submit } from '../actions/submit'\n",
    )

    assert.deepEqual(await findBoundaryViolations(files, root), [])
  })
})

test('requires components to live in matching component directories', async () => {
  await withFixture(async ({ root }) => {
    const componentDirectory = path.join(
      root,
      'src',
      'features',
      'contact',
      'ui',
      'components',
      'contact-form',
    )
    await mkdir(componentDirectory, { recursive: true })

    const validComponent = path.join(componentDirectory, 'contact-form.tsx')
    const looseComponent = path.join(
      root,
      'src',
      'features',
      'contact',
      'ui',
      'form.tsx',
    )
    await writeFile(validComponent, 'export function ContactForm() {}\n')
    await writeFile(looseComponent, 'export function Form() {}\n')

    const violations = findComponentLayoutViolations(
      [validComponent, looseComponent],
      root,
    )

    assert.equal(violations.length, 1)
    assert.match(violations[0], /form\.tsx.*form\//)
  })
})

test('allows App Router entry components to keep framework filenames', async () => {
  await withFixture(async ({ root }) => {
    const routeEntry = path.join(root, 'src', 'app', 'page.tsx')
    await mkdir(path.dirname(routeEntry), { recursive: true })
    await writeFile(routeEntry, 'export default function Page() {}\n')

    assert.deepEqual(findComponentLayoutViolations([routeEntry], root), [])
  })
})
