'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'dark' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'oklch(0.704 0.14 182.503 / 0.1)',
          '--normal-text': 'oklch(0.985 0 0)',
          '--normal-border': 'transparent',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
