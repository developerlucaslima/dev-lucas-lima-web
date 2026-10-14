import type { ComponentProps } from 'react'

import { cn } from '@/lib/styles/cn'

import { cardTitleStyles } from './card-title.styles'

export function CardTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(cardTitleStyles.root, className)}
      {...props}
    />
  )
}
