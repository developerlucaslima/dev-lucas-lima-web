'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

import { toastProviderStyles } from './toast-provider.styles'
import type { ToastProviderProps } from './toast-provider.types'

export function ToastProvider({ ...props }: ToastProviderProps) {
  const { theme = 'dark' } = useTheme()

  return (
    <Sonner
      theme={theme as ToastProviderProps['theme']}
      className={toastProviderStyles.root}
      style={toastProviderStyles.themeVariables}
      {...props}
    />
  )
}
