import type { ComponentProps } from 'react'

import { cn } from '@/lib/styles/cn'

import { cardContentStyles } from './card-content.styles'

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentStyles.root, className)}
      {...props}
    />
  )
}
