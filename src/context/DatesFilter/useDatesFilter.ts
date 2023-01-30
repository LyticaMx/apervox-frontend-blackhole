import { useContext } from 'react'
import { ContextType } from 'types/datesFilter'
import { DatesFilterContext } from './context'

export const useDatesFilter = (): ContextType =>
  useContext(DatesFilterContext)
