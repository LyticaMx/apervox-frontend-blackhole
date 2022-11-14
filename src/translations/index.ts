import esMx from './es-mx.json'
import en from './en.json'

export interface Translations {
  'es-mx': any
  en: any
}

export const translations: Translations = {
  en,
  'es-mx': esMx
}
