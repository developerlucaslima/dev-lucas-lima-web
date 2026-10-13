import type { ComponentProps } from 'react'

import { cn } from '@/lib/styles/cn'

import { cardDescriptionStyles } from './card-description.styles'

export function CardDescription({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(cardDescriptionStyles.root, className)}
      {...props}
    />
  )
}
