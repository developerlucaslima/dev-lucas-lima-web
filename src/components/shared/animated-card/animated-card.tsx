import type { CardProps } from '@fradelli/ui/card'

import { GlassCard } from '@/components/shared/glass-card/glass-card'
import { cn } from '@/lib/styles/cn'

import { animatedCardStyles } from './animated-card.styles'

export function AnimatedCard({ className, ...props }: CardProps) {
  return (
    <GlassCard
      data-slot="card"
      className={cn(animatedCardStyles.root, className)}
      {...props}
    />
  )
}
