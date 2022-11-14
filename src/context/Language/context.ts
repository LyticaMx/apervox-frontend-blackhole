import { Context, createContext } from 'react'
import { es } from 'date-fns/locale'

import { LanguageContextType } from 'types/language'

export const initialState: LanguageContextType = {
  localeI18n: 'es-mx',
  locale: es
}

export const LanguageContext: Context<LanguageContextType> =
  createContext(initialState)
