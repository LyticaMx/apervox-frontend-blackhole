import { useContext } from 'react'
import { ContextType } from './types'
import { CallHistoryContext } from './context'

export const useCallHistory = (): ContextType => useContext(CallHistoryContext)
