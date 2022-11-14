import { Locale } from 'date-fns'

export type LocaleI18n = 'es-mx' | 'en'
export type LocaleType = 'es' | 'en'

export interface LanguageContextType {
  localeI18n: LocaleI18n
  locale: Locale
  actions?: {
    changeLocale: (newLocale: LocaleType) => void
  }
}
