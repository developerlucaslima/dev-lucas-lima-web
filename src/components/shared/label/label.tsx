'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import * as React from 'react'

import { cn } from '@/lib/styles/cn'

import { labelStyles } from './label.styles'
import type { LabelProps } from './label.types'

function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelStyles.root, className)}
      {...props}
    />
  )
}

export { Label }
