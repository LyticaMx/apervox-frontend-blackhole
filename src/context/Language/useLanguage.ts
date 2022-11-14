import { useContext } from 'react'
import { LanguageContextType } from 'types/language'
import { LanguageContext } from './context'

export const useLanguage = (): LanguageContextType =>
  useContext(LanguageContext)
