import {
  Clock,
  Clover,
  Github,
  HandHelping,
  Linkedin,
  SmilePlus,
} from 'lucide-react'
import { FaCss3, FaGithub, FaNodeJs, FaReact } from 'react-icons/fa'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiGraphql,
  SiJavascript,
  SiPostgresql,
  SiTypescript,
} from 'react-icons/si'

import { calculateDurationFrom } from '@/utils/calculate-duration'

const { duration: yearsAsDev } = calculateDurationFrom({
  startDate: new Date(2022, 6, 1),
})
const { years: yearsOld } = calculateDurationFrom({
  startDate: new Date(1995, 10, 10),
})

export const english = {
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
    paragraphs: [
      `Hello, my name is Lucas Fraga de Lima. I am ${yearsOld} years old, Brazilian from Gramado - RS, and currently living in Florianópolis - SC.`,
      `My journey as a developer began about ${yearsAsDev} years ago; since then, I have worked with various technologies and frameworks, specializing in frontend with JavaScript, TypeScript, React, Next, and Vue. Leveraging my design skills, I create intuitive, functional, and visually appealing interfaces.`,
      'I have also frequently worked as a backend or full stack developer, delivering high-quality solutions using primarily Node but also Java, including the development and consumption of REST and GraphQL APIs. Constantly staying updated on best practices, applying modern patterns to ensure performance, scalability, and maintainability.',
    ],
    aboutCard: {
      title: 'Dev Lucas Lima',
      icons: [
        {
          href: 'https://www.linkedin.com/in/developerlucaslima',
          target: '_blank',
          rel: 'noopener noreferrer',
          iconKey: Linkedin,
        },
        {
          href: 'https://github.com/developerlucaslima',
          target: '_blank',
          rel: 'noopener noreferrer',
          iconKey: Github,
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
        iconKey: SmilePlus,
        title: 'Kaizen ',
        description: [
          'Continuous, incremental improvement in every aspect of life and work.',
        ],
        footer: '改善',
      },
      {
        iconKey: Clover,
        title: 'Ikigai ',
        description: [
          'Where passion, mission, vocation, and profession converge to give life meaning.',
        ],
        footer: '生き甲斐',
      },
      {
        iconKey: HandHelping,
        title: 'Omoiyari',
        description: [
          'Genuine empathy and proactive care for others, foster harmony, respect, and deeper connections.',
        ],
        footer: '思いやり',
      },
      {
        iconKey: Clock,
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
    {
      id: 2,
      icon: SiTypescript,
      name: 'TYPESCRIPT',
    },
    {
      id: 12,
      icon: SiJavascript,
      name: 'JAVASCRIPT',
    },
    {
      id: 0,
      icon: FaReact,
      name: 'REACT',
    },
    {
      id: 1,
      icon: RiNextjsFill,
      name: 'NEXT',
    },
    {
      id: 3,
      icon: FaNodeJs,
      name: 'NODE',
    },
    {
      id: 5,
      icon: RiTailwindCssFill,
      name: 'TAILWIND',
    },
    {
      id: 11,
      icon: FaCss3,
      name: 'CSS',
    },
    {
      id: 6,
      icon: SiGraphql,
      name: 'GRAPHQL',
    },
    {
      id: 8,
      icon: SiPostgresql,
      name: 'SQL',
    },
    {
      id: 9,
      icon: FaGithub,
      name: 'GIT',
    },
  ],
  contactMe: {
    title: 'Space Communication',
    form: {
      formTitle: 'Launch Your Message',
      formSubtitle: 'Prepare for liftoff!',
      inputs: [
        {
          name: 'Astronaut Name',
          placeholder: 'Your astronaut name',
          type: '',
          register: 'name',
        },
        {
          name: 'Space Email',
          placeholder: 'your.astronaut@example.space',
          type: 'email',
          register: 'email',
        },
      ],
      textArea: {
        name: 'Space Message',
        placeholder: 'Your message to the cosmos...',
        register: 'message',
      },
      buttonTexts: {
        isSubmitting: 'Launching...',
        isNotSubmitting: 'Launch Message',
      },
    },
    formErrorMessages: {
      astronautName: 'Name must be at least 2 characters',
      spaceEmail: 'Enter a valid space email',
      spaceMessage: 'Message must be at least 20 characters',
    },
    submitToastMessages: {
      success: {
        title: 'Launched Successfully!',
        description:
          'Your message has successfully entered orbit and is on its way to the cosmos!',
      },
      error: {
        title: 'Communication Failure',
        description:
          'Communication satellites are experiencing interference! Please try again later.',
      },
    },
  },
}
