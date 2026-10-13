import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import type { buttonVariants } from './button.styles'

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    readonly asChild?: boolean
  }
