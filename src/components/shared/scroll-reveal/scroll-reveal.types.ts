import type { ReactNode } from 'react'

export interface ScrollRevealProps {
  readonly children: ReactNode
  readonly className?: string
  readonly delay?: number
  readonly duration?: number
  readonly fromX?: number
  readonly fromY?: number
  readonly triggerOffset?: number
}
