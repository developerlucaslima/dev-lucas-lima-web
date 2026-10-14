import type { IconType } from 'react-icons'
import { FaCss3, FaGithub, FaJava, FaNodeJs, FaReact } from 'react-icons/fa'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiGraphql,
  SiJavascript,
  SiNestjs,
  SiPostgresql,
  SiSpringboot,
  SiTypescript,
} from 'react-icons/si'

import type { HardSkillIconKey } from '@/features/portfolio/content/portfolio-content.types'

export const hardSkillIcons: Record<HardSkillIconKey, IconType> = {
  css: FaCss3,
  github: FaGithub,
  graphql: SiGraphql,
  javascript: SiJavascript,
  next: RiNextjsFill,
  node: FaNodeJs,
  postgresql: SiPostgresql,
  react: FaReact,
  tailwind: RiTailwindCssFill,
  typescript: SiTypescript,
  nestjs: SiNestjs,
  java: FaJava,
  spring: SiSpringboot,
}
