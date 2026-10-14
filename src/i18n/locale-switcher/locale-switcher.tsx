'use client'

import { Button } from '@fradelli/ui/button'

import { SUPPORTED_LOCALES } from '../config'
import { useLocaleSwitcher } from './hooks/use-locale-switcher'
import { localeAbbreviations, localeLabels } from './locale-switcher.constants'
import { localeSwitcherStyles } from './locale-switcher.styles'

export function LocaleSwitcher() {
  const { activeLocale, translate, isPending, changeLocale } =
    useLocaleSwitcher()

  return (
    <div
      aria-busy={isPending}
      aria-label={translate('label')}
      className={localeSwitcherStyles.group}
      role="group"
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <Button
          variant="ghost"
          size="sm"
          key={locale}
          aria-label={translate(localeLabels[locale])}
          aria-pressed={locale === activeLocale}
          className={`${localeSwitcherStyles.button} ${
            locale === activeLocale ? localeSwitcherStyles.selected : ''
          }`}
          disabled={isPending}
          onClick={() => changeLocale(locale)}
          type="button"
        >
          {localeAbbreviations[locale]}
        </Button>
      ))}
    </div>
  )
}
