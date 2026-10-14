import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { setLocale } from '@/app/actions/set-locale'

import type { AppLocale } from '../../config'

export function useLocaleSwitcher() {
  const activeLocale = useLocale()
  const translate = useTranslations('LocaleSwitcher')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function changeLocale(locale: AppLocale) {
    if (locale === activeLocale || isPending) return

    startTransition(async () => {
      try {
        await setLocale(locale)
        router.refresh()
      } catch {
        toast.error(translate('switchFailed'))
      }
    })
  }

  return { activeLocale, translate, isPending, changeLocale }
}
