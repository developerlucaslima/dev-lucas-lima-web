export const personalProjects = [
  {
    id: 'suna',
    name: 'Suna',
    logo: { src: '/suna-logo.png', width: 1254, height: 1254 },
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
