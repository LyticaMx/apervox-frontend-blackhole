import { useContext } from 'react'
import { ContextType } from 'types/overflowLine'
import { OverflowLineContext } from './context'

export const useOverflowLine = (): ContextType =>
  useContext(OverflowLineContext)
