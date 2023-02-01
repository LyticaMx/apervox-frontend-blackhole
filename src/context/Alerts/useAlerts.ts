import { useContext } from 'react'
import { AlertsContext } from './context'
import { AlertContextType } from 'types/alert'

export const useAlerts = (): AlertContextType => useContext(AlertsContext)
