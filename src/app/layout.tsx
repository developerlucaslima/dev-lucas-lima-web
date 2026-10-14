import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'

import { ThemeProvider } from '@/components/shared/theme-provider/theme-provider'
import { I18nClientProvider } from '@/i18n/i18n-client-provider/i18n-client-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export async function generateMetadata(): Promise<Metadata> {
  const translate = await getTranslations('Metadata')

  return {
    title: translate('title'),
    description: translate('description'),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans antialiased">
        <I18nClientProvider locale={locale} messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nClientProvider>
      </body>
    </html>
  )
}
