import { useContext } from 'react'
import { DashboardCallContextType } from 'types/call'
import { CallsContext } from './context'

export const useCalls = (): DashboardCallContextType => useContext(CallsContext)
