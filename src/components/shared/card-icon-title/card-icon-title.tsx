import type { ComponentProps } from 'react'

import { cn } from '@/lib/styles/cn'

import { cardIconTitleStyles } from './card-icon-title.styles'

export function CardIconTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(cardIconTitleStyles.root, className)}
      {...props}
    />
  )
}
