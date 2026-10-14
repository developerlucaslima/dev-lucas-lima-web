import type { ComponentProps } from 'react'

import { cn } from '@/lib/styles/cn'

import { cardHeaderStyles } from './card-header.styles'

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderStyles.root, className)}
      {...props}
    />
  )
}
