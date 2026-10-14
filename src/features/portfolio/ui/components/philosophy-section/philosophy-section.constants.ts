import { Clock, Clover, HandHelping, SmilePlus } from 'lucide-react'

import type { PhilosophyIconKey } from '@/features/portfolio/content/portfolio-content.types'

export const philosophyIcons = {
  clock: Clock,
  clover: Clover,
  handHelping: HandHelping,
  smilePlus: SmilePlus,
} satisfies Record<PhilosophyIconKey, typeof Clock>
