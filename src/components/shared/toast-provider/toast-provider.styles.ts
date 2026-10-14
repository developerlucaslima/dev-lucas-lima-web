import type { CSSProperties } from 'react'

export const toastProviderStyles = {
  root: 'toaster group',
  themeVariables: {
    '--normal-bg': 'var(--portfolio-glass-elevated)',
    '--normal-text': 'var(--fd-color-foreground)',
    '--normal-border': 'var(--fd-color-border)',
  } as CSSProperties,
} as const
