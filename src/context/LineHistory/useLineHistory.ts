import { useContext } from 'react'
import { ContextType } from './types'
import { LineHistoryContext } from './context'

export const useLineHistory = (): ContextType => useContext(LineHistoryContext)
