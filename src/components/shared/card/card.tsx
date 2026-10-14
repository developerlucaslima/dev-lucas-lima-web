import type { ComponentProps } from 'react'

import { cn } from '@/lib/styles/cn'

import { cardStyles } from './card.styles'

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(cardStyles.root, className)}
      {...props}
    />
  )
}
