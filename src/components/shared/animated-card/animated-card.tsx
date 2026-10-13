import type { ComponentProps } from 'react'

import { cn } from '@/lib/styles/cn'

import { animatedCardStyles } from './animated-card.styles'

export function AnimatedCard({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(animatedCardStyles.root, className)}
      {...props}
    />
  )
}
