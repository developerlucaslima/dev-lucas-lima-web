import { Card, type CardProps } from '@fradelli/ui/card'

import { cn } from '@/lib/styles/cn'

import { glassCardStyles } from './glass-card.styles'

export function GlassCard({ className, ...props }: CardProps) {
  return <Card className={cn(glassCardStyles.root, className)} {...props} />
}
