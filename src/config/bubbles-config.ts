import {
  Box,
  Braces,
  Code2,
  Database,
  FileCode,
  GitBranch,
  Layers,
  Palette,
  Server,
} from 'lucide-react'

import type { BubbleProps } from '@/components/ui/bubble'

export const bubblesConfig: BubbleProps[] = [
  {
    id: 0,
    initialX: 0,
    initialY: 0,
    name: 'REACT',
    icon: Code2,
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
    icon: Braces,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 2,
    initialX: 0,
    initialY: 0,
    name: 'TYPESCRIPT',
    icon: FileCode,
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
    icon: Server,
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
    icon: Layers,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 6,
    initialX: 0,
    initialY: 0,
    name: 'MONGODB',
    icon: Database,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 7,
    initialX: 0,
    initialY: 0,
    name: 'GIT',
    icon: GitBranch,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
  {
    id: 8,
    initialX: 0,
    initialY: 0,
    name: 'DOCKER',
    icon: Box,
    onClick: function (): void {
      throw new Error('Function not implemented.')
    },
    isOrganized: false,
  },
]
