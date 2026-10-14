import type { HardSkillContent } from './portfolio-content.types'

export const portfolioProfile = {
  name: 'Dev Lucas Lima',
  image: {
    src: '/lucas-lima-anime-sunset-hoodie.png',
    width: 1086,
    height: 1448,
  },
  socialLinks: [
    {
      iconKey: 'linkedin',
      href: 'https://www.linkedin.com/in/developerlucaslima',
    },
    { iconKey: 'github', href: 'https://github.com/developerlucaslima' },
  ],
} as const
export const hardSkills = [
  { id: 2, iconKey: 'typescript', name: 'TypeScript' },
  { id: 0, iconKey: 'react', name: 'React' },
  { id: 1, iconKey: 'next', name: 'Next.js' },
  { id: 3, iconKey: 'node', name: 'Node.js' },
  { id: 13, iconKey: 'nestjs', name: 'NestJS' },
  { id: 14, iconKey: 'java', name: 'Java' },
  { id: 15, iconKey: 'spring', name: 'Spring Boot' },
  { id: 8, iconKey: 'postgresql', name: 'PostgreSQL' },
  { id: 5, iconKey: 'tailwind', name: 'Tailwind CSS' },
  { id: 9, iconKey: 'github', name: 'Git' },
] as const satisfies readonly HardSkillContent[]
export const skillGroups = [
  {
    id: 'engineering',
    technologies: [
      'TypeScript',
      'React',
      'Next.js',
      'Vue.js',
      'Node.js',
      'NestJS',
      'Java',
      'Spring Boot',
      'WebFlux',
    ],
  },
  {
    id: 'systems',
    technologies: [
      'PostgreSQL',
      'Prisma',
      'Redis',
      'Docker',
      'GitHub Actions',
      'Vitest',
      'Supertest',
      'Dynatrace',
      'Grafana',
      'Prometheus',
    ],
  },
  {
    id: 'product',
    technologies: ['Figma', 'UX/UI', 'Adobe Photoshop', 'Adobe Illustrator'],
  },
] as const
