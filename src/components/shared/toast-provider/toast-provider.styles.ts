import type { CSSProperties } from 'react'

export const toastProviderStyles = {
  root: 'toaster group',
  themeVariables: {
    '--normal-bg': 'oklch(0.704 0.14 182.503 / 0.1)',
    '--normal-text': 'oklch(0.985 0 0)',
    '--normal-border': 'transparent',
  } as CSSProperties,
} as const
