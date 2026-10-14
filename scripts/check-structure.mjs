import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)
const sourceRoot = path.join(projectRoot, 'src')
const sourceExtensions = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']
const importPattern =
  /\b(?:import|export)\s+(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]|\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)|\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) return collectSourceFiles(entryPath)
      if (
        entry.isFile() &&
        sourceExtensions.includes(path.extname(entry.name))
      ) {
        return [entryPath]
      }
      return []
    }),
  )

  return nestedFiles.flat()
}

function resolveLocalImport(importerPath, specifier, sourceDirectory) {
  if (specifier.startsWith('@/')) {
    return path.join(sourceDirectory, specifier.slice(2))
  }
  if (specifier.startsWith('.')) {
    return path.resolve(path.dirname(importerPath), specifier)
  }
  return null
}

async function resolveSourcePath(candidatePath) {
  const candidates = [
    candidatePath,
    ...sourceExtensions.map((extension) => `${candidatePath}${extension}`),
    ...sourceExtensions.map((extension) =>
      path.join(candidatePath, `index${extension}`),
    ),
  ]

  for (const candidate of candidates) {
    try {
      if ((await stat(candidate)).isFile()) return candidate
    } catch {
      // The import may point to an external package or a non-source asset.
    }
  }

  return null
}

export async function findBoundaryViolations(files, root = projectRoot) {
  const violations = []
  const sourceDirectory = path.join(root, 'src')

  for (const importerPath of files) {
    const source = await readFile(importerPath, 'utf8')
    const importerRelativePath = path.relative(root, importerPath)
    const isUiModule =
      importerRelativePath.startsWith(`src${path.sep}components${path.sep}`) ||
      importerRelativePath.includes(`${path.sep}ui${path.sep}`)

    for (const match of source.matchAll(importPattern)) {
      const specifier = match[1] ?? match[2] ?? match[3]
      const candidatePath = resolveLocalImport(
        importerPath,
        specifier,
        sourceDirectory,
      )
      if (!candidatePath) continue

      const targetPath = await resolveSourcePath(candidatePath)
      if (!targetPath) continue

      const targetRelativePath = path.relative(sourceDirectory, targetPath)
      const importsFeatureFromLib =
        importerRelativePath.startsWith(`src${path.sep}lib${path.sep}`) &&
        targetRelativePath.startsWith(`features${path.sep}`)
      const importsDataFromUi =
        isUiModule && targetRelativePath.includes(`${path.sep}data${path.sep}`)

      if (importsFeatureFromLib) {
        violations.push(
          `${importerRelativePath} imports a feature module (${specifier})`,
        )
      }
      if (importsDataFromUi) {
        violations.push(
          `${importerRelativePath} imports feature data directly (${specifier})`,
        )
      }
    }
  }

  return violations
}

export function findComponentLayoutViolations(files, root = projectRoot) {
  const sourceDirectory = path.join(root, 'src')
  const violations = []

  for (const filePath of files) {
    if (path.extname(filePath) !== '.tsx') continue

    const relativePath = path.relative(sourceDirectory, filePath)
    if (relativePath.startsWith(`app${path.sep}`)) continue

    const componentName = path.basename(filePath, '.tsx')
    const componentDirectoryName = path.basename(path.dirname(filePath))
    if (componentDirectoryName !== componentName) {
      violations.push(
        `${path.relative(root, filePath)} must live in a ${componentName}/ directory with its own files`,
      )
    }
  }

  return violations
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const files = await collectSourceFiles(sourceRoot)
  const violations = [
    ...(await findBoundaryViolations(files)),
    ...findComponentLayoutViolations(files),
  ]

  if (violations.length > 0) {
    console.error('Project structure checks failed:')
    violations.forEach((violation) => console.error(`- ${violation}`))
    process.exitCode = 1
  } else {
    console.log(
      `Project structure checks passed for ${files.length} source files.`,
    )
  }
}
