import { Code2, Github, Linkedin } from 'lucide-react'

import { calculateDurationFrom } from '@/utils/calculate-duration'

import { heroConfig } from './hero-config'

const { duration: yearsAsDev } = calculateDurationFrom({
  startDate: new Date(2022, 6, 1),
})
const { years: yearsOld } = calculateDurationFrom({
  startDate: new Date(1995, 10, 10),
})

export const aboutConfig = {
  sectionTitle: 'About',
  paragraphs: [
    `Hello, my name is Lucas Fraga de Lima. I am ${yearsOld} years old, Brazilian from Gramado - RS, and currently living in Florianópolis - SC.`,
    `My journey as a developer began about ${yearsAsDev} years ago; since then, I have worked with various technologies and frameworks, specializing in frontend with JavaScript, TypeScript, React, Next, and Vue. Leveraging my design skills, I create intuitive, functional, and visually appealing interfaces.`,
    'I have also frequently worked as a backend or full stack developer, delivering high-quality solutions using primarily Node but also Java, including the development and consumption of REST and GraphQL APIs. Constantly staying updated on best practices, applying modern patterns to ensure performance, scalability, and maintainability.',
  ],
  rightCard: {
    icon: Code2,
    title: 'Dev Lucas Lima',
    details: heroConfig.subtitles.map((subtitle) => `${subtitle}`),
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
  image: {
    src: '/me.png',
    alt: 'Dev Lucas Lima',
    width: 400,
    height: 400,
  },
}
