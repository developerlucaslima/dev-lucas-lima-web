export const personalProjects = [
  {
    id: 'sandicts',
    name: 'Sandicts',
    status: 'in-development',
    start: '2026-01',
    links: [{ id: 'website', href: 'https://sandicts.com.br/' }],
    technologies: [
      'TypeScript',
      'React',
      'Next.js',
      'NestJS',
      'PostgreSQL',
      'Prisma',
      'Docker',
      'Vercel',
    ],
  },
  {
    id: 'design-system',
    name: 'Design System',
    status: 'catalog-published',
    links: [
      { id: 'website', href: 'https://fradelli.github.io/design-system/' },
      { id: 'repository', href: 'https://github.com/fradelli/design-system' },
    ],
    technologies: [
      'React',
      'TypeScript',
      'CSS',
      'Tailwind CSS',
      'Storybook',
      'Vitest',
    ],
  },
] as const
