import * as React from 'react'

import { cn } from '@/lib/styles/cn'

import { textareaStyles } from './textarea.styles'
import type { TextareaProps } from './textarea.types'

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaStyles.root, textareaStyles.focus, className)}
      {...props}
    />
  )
}

export { Textarea }
