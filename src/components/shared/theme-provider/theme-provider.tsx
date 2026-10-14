'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

import type { ThemeProviderProps } from './theme-provider.types'

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  )
}
