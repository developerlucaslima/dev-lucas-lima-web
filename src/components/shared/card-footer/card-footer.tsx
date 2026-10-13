import type { ComponentProps } from 'react'

import { cn } from '@/lib/styles/cn'

import { cardFooterStyles } from './card-footer.styles'

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterStyles.root, className)}
      {...props}
    />
  )
}
