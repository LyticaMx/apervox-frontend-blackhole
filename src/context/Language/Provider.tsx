import { useState, useMemo, ReactElement } from 'react'
import { IntlProvider } from 'react-intl'
import { es, enUS } from 'date-fns/locale'

import { translations } from 'translations'
import { LocaleType, LocaleI18n } from 'types/language'

import { LanguageContext, initialState } from './context'

interface Props {
  children: ReactElement
}
const LanguageProvider = ({ children }: Props): ReactElement => {
  const [localeI18n, setLocaleI18n] = useState<LocaleI18n>(
    initialState.localeI18n
  )
  const [locale, setLocale] = useState<Locale>(initialState.locale)

  const localeI18nJSON = {
    en: 'en',
    es: 'es-mx'
  }

  const localeDateFnsJSON = {
    en: enUS,
    es
  }

  const changeLocale = (newLocale: LocaleType): void => {
    setLocale(localeDateFnsJSON[newLocale])
    setLocaleI18n(localeI18nJSON[newLocale] as LocaleI18n)
  }

  const contextValue = useMemo(
    () => ({
      localeI18n,
      locale,
      actions: {
        changeLocale
      }
    }),
    [locale]
  )

  return (
    <LanguageContext.Provider value={contextValue}>
      <IntlProvider locale={localeI18n} messages={translations[localeI18n]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export { LanguageProvider }
