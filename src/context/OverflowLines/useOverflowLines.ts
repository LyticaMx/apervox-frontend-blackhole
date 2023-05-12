import { useContext } from 'react'
import { OverflowLineContextType } from 'types/overflowLine'
import { OverflowLineContext } from './context'

export const useOverflowLine = (): OverflowLineContextType =>
  useContext(OverflowLineContext)
