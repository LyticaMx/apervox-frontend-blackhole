import { subHours } from 'date-fns'
import { Context, createContext } from 'react'
import { AlertContextState, AlertContextType } from 'types/alert'

export const initialState: AlertContextState = {
  listOfAlerts: [],
  alertsPagination: {
    limit: 10,
    page: 1,
    totalRecords: 0
  },
  listOfCallsAlerts: [],
  callsPagination: {
    limit: 10,
    page: 1,
    sort: [],
    totalRecords: 0
  },
  charts: [],
  currentAlert: {
    category: '',
    condition: '',
    id: '',
    incidences: 0,
    active: false
  },
  globalFilter: {
    start_time: subHours(new Date(), 72)
  }
}

export const AlertsContext: Context<AlertContextType> =
  createContext(initialState)
