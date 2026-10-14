'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ComponentProps } from 'react'

import { TOOLTIP_DEFAULT_DELAY_DURATION } from './tooltip-provider.constants'

export function TooltipProvider({
  delayDuration = TOOLTIP_DEFAULT_DELAY_DURATION,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}
