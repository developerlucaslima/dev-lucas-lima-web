import { Palette } from 'lucide-react'
import { DiDocker, DiGithub } from 'react-icons/di'
import { FaCss3, FaNodeJs, FaReact } from 'react-icons/fa'
import { MdHttp } from 'react-icons/md'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiGraphql,
  SiJavascript,
  SiPostgresql,
  SiTypescript,
} from 'react-icons/si'

import type { BubbleProps } from '@/components/ui/bubble'

export const bubblesConfig: BubbleProps[] = [
  {
    id: 2,
    initialX: 0,
    initialY: 0,
    name: 'TYPESCRIPT',
    icon: SiTypescript,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 12,
    initialX: 0,
    initialY: 0,
    name: 'JAVASCRIPT',
    icon: SiJavascript,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 0,
    initialX: 0,
    initialY: 0,
    name: 'REACT',
    icon: FaReact,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 1,
    initialX: 0,
    initialY: 0,
    name: 'NEXT.JS',
    icon: RiNextjsFill,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },

  {
    id: 3,
    initialX: 0,
    initialY: 0,
    name: 'NODE.JS',
    icon: FaNodeJs,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 4,
    initialX: 0,
    initialY: 0,
    name: 'UI/UX',
    icon: Palette,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 5,
    initialX: 0,
    initialY: 0,
    name: 'TAILWIND',
    icon: RiTailwindCssFill,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 11,
    initialX: 0,
    initialY: 0,
    name: 'CSS',
    icon: FaCss3,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 6,
    initialX: 0,
    initialY: 0,
    name: 'GRAPHQL',
    icon: SiGraphql,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 7,
    initialX: 0,
    initialY: 0,
    name: 'REST',
    icon: MdHttp,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 8,
    initialX: 0,
    initialY: 0,
    name: 'POSTGRESQL',
    icon: SiPostgresql,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 9,
    initialX: 0,
    initialY: 0,
    name: 'GIT',
    icon: DiGithub,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 10,
    initialX: 0,
    initialY: 0,
    name: 'DOCKER',
    icon: DiDocker,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
]
