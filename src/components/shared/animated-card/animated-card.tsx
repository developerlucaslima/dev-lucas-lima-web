import type { CardProps } from '@fradelli/ui/card'
import { Card } from '@fradelli/ui/card'

import { cn } from '@/lib/styles/cn'

import { animatedCardStyles } from './animated-card.styles'

export function AnimatedCard({ className, ...props }: CardProps) {
  return (
    <Card
      data-slot="card"
      className={cn(animatedCardStyles.root, className)}
      {...props}
    />
  )
}
