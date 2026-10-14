import { Github, Linkedin } from 'lucide-react'

import type { SocialIconKey } from '@/features/portfolio/content/portfolio-content.types'

export const socialIcons = {
  github: Github,
  linkedin: Linkedin,
} satisfies Record<SocialIconKey, typeof Github>
