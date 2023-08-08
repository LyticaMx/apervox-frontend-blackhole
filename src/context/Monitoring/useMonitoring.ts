import { useContext } from 'react'
import { MonitoringContext } from './context'
import { ContextType } from './types'

export const useMonitoring = (): ContextType => useContext(MonitoringContext)
