import { format as fnsFormat } from 'date-fns'

import { useLanguage } from 'context/Language'

interface HookDate {
  format: (date: Date, formatDate) => string
}

export const useDate = (): HookDate => {
  const { locale } = useLanguage()

  const format = (date: Date, formatDate: string): string => {
    return fnsFormat(date, formatDate, {
      locale
    })
  }

  return {
    format
  }
}
