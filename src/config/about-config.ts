import { Brain, Code2, Github, Linkedin, User } from 'lucide-react'

import { calculateDurationFrom } from '@/utils/calculate-duration'

import { heroConfig } from './hero-config'

export const aboutConfig = {
  sectionTitle: 'About',
  firstParagraph: `My journey as a developer began about ${calculateDurationFrom({ startDate: new Date(2022, 6, 1) })} years ago; since then, I have worked with various technologies and frameworks, specializing in frontend with JavaScript, TypeScript, React, Next, and Vue. Leveraging my design skills, I create intuitive, functional, and visually appealing interfaces.`,
  secondParagraph:
    'I have also frequently worked as a backend or full stack developer, delivering high-quality solutions using primarily Node but also Java, including the development and consumption of REST and GraphQL APIs. Constantly staying updated on best practices, I apply modern patterns to ensure performance, scalability, and maintainability.',
  leftCards: [
    {
      icon: Brain,
      title: 'Philosophy',
      details: [
        '- Kaizen (改善): continuous, incremental improvement in every aspect of life and work.',
        '- Ikigai (生き甲斐): where passion, mission, vocation, and profession converge to give life meaning.',
      ],
    },
    {
      icon: User,
      title: 'Me',
      details: [
        `- ${calculateDurationFrom({ startDate: new Date(1995, 10, 10) })} yo`,
        '- Brazil',
        '- Florianópolis, State of Santa Catarina',
      ],
      footer: [
        {
          href: 'https://www.linkedin.com/in/developerlucaslima',
          target: '_blank',
          rel: 'noopener noreferrer',
          icon: Linkedin,
        },
        {
          href: 'https://github.com/developerlucaslima',
          target: '_blank',
          rel: 'noopener noreferrer',
          icon: Github,
        },
      ],
    },
  ],
  rightCard: {
    icon: Code2,
    title: 'Dev Lucas Lima',
    details: heroConfig.subtitles.map((subtitle) => `- ${subtitle}`),
  },
  image: {
    src: '/dev-lucas-lima.jpg',
    alt: 'Dev Lucas Lima',
    width: 400,
    height: 400,
  },
}
