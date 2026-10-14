import * as React from 'react'

import { cn } from '@/lib/styles/cn'

import { inputStyles } from './input.styles'
import type { InputProps } from './input.types'

function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputStyles.root,
        inputStyles.focus,
        inputStyles.invalid,
        className,
      )}
      {...props}
    />
  )
}

export { Input }
