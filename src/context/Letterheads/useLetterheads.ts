import { useContext } from 'react'
import { LetterheadsContext } from './context'
import { ContextType } from './types'

export const useLetterheads = (): ContextType =>
  useContext(LetterheadsContext)
