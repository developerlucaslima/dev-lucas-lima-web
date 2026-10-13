import type { StaticPortfolioContent } from './portfolio-content.types'

export const portfolioContentEn = {
  hero: {
    sectionTitle: 'Dev Lucas Lima',
    subtitles: [
      'Full Stack Developer',
      'Stronger in Front End',
      'UI/UX Enthusiast',
    ],
    scrollDown: 'scroll down',
  },
  about: {
    sectionTitle: 'About',
    paragraphs: {
      introduction:
        'Hello, my name is Lucas Fraga de Lima. I am {age} years old, Brazilian from Gramado - RS, and currently living in Florianópolis - SC.',
      developerJourney:
        'My journey as a developer began about {duration} ago; since then, I have worked with various technologies and frameworks, specializing in frontend with JavaScript, TypeScript, React, Next, and Vue. Leveraging my design skills, I create intuitive, functional, and visually appealing interfaces.',
      professionalExperience:
        'I have also frequently worked as a backend or full stack developer, delivering high-quality solutions using primarily Node but also Java, including the development and consumption of REST and GraphQL APIs. Constantly staying updated on best practices, applying modern patterns to ensure performance, scalability, and maintainability.',
    },
    aboutCard: {
      title: 'Dev Lucas Lima',
      links: [
        {
          href: 'https://www.linkedin.com/in/developerlucaslima',
          iconKey: 'linkedin',
        },
        {
          href: 'https://github.com/developerlucaslima',
          iconKey: 'github',
        },
      ],
    },
    image: {
      src: '/me.jpg',
      alt: 'Dev Lucas Lima',
      width: 400,
      height: 400,
    },
  },
  philosophy: {
    sectionTitle: 'philosophy',
    cards: [
      {
        iconKey: 'smilePlus',
        title: 'Kaizen ',
        description: [
          'Continuous, incremental improvement in every aspect of life and work.',
        ],
        footer: '改善',
      },
      {
        iconKey: 'clover',
        title: 'Ikigai ',
        description: [
          'Where passion, mission, vocation, and profession converge to give life meaning.',
        ],
        footer: '生き甲斐',
      },
      {
        iconKey: 'handHelping',
        title: 'Omoiyari',
        description: [
          'Genuine empathy and proactive care for others, foster harmony, respect, and deeper connections.',
        ],
        footer: '思いやり',
      },
      {
        iconKey: 'clock',
        title: 'Shikata ga nai',
        description: [
          'Embraces the inevitable flow of time and the acceptance of circumstances that cannot be changed.',
        ],
        footer: '仕方がない',
      },
    ],
  },
  journey: {
    sectionTitle: 'journey experience',
    cards: [
      {
        date: '2024 - 2025',
        title: 'Front End',
        company: 'Visit Ai',
        href: 'https://visiteai.com.br',
      },
      {
        date: '2024 - 2025',
        title: 'Full Stack',
        company: 'StartU',
        href: 'https://startu.com.br/',
      },
      {
        date: '2023 - 2024',
        title: 'Full Stack',
        company: 'Declink',
        href: 'https://declink.com.br/',
      },
      {
        date: '2022 - 2023',
        title: 'Front End',
        company: 'Santa Group',
        href: 'https://www.santagroup.com.br/',
      },
      {
        date: '2019 - 2023',
        title: 'Web Designer',
        company: 'Freelancer',
        href: 'https://www.behance.net/developerlucaslima',
      },
      {
        date: '2020 - 2022',
        title: 'Administrative Manager',
        company: 'Rota Sul Travel Agency',
        href: 'https://www.rotasul.tur.br/',
      },
      {
        date: '2015 - 2020',
        title: 'Financial Analyst',
        company: 'Rota Sul Travel Agency',
        href: 'https://www.rotasul.tur.br/',
      },
    ],
  },
  hardSkills: [
    { id: 2, iconKey: 'typescript', name: 'TYPESCRIPT' },
    { id: 12, iconKey: 'javascript', name: 'JAVASCRIPT' },
    { id: 0, iconKey: 'react', name: 'REACT' },
    { id: 1, iconKey: 'next', name: 'NEXT' },
    { id: 3, iconKey: 'node', name: 'NODE' },
    { id: 5, iconKey: 'tailwind', name: 'TAILWIND' },
    { id: 11, iconKey: 'css', name: 'CSS' },
    { id: 6, iconKey: 'graphql', name: 'GRAPHQL' },
    { id: 8, iconKey: 'postgresql', name: 'SQL' },
    { id: 9, iconKey: 'github', name: 'GIT' },
  ],
} as const satisfies StaticPortfolioContent
