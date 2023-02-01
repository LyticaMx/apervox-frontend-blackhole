import { subHours } from 'date-fns'
import { Context, createContext } from 'react'
import { DashboardCallContextType } from 'types/call'

export const initialState: DashboardCallContextType = {
  listOfCalls: [],
  callsPagination: {
    calls: 'ALL',
    limit: 10,
    orderBy: 'CREATED_AT',
    page: 1,
    pin_number: null,
    totalRecords: 0
  },
  pinActivityList: [],
  pinsPagination: {
    limit: 10,
    page: 1,
    totalRecords: 0
  },
  counts: {
    calls: { current: 0, last: 0, change: 100 },
    pins: { current: 0, last: 0, change: 100 },
    alerts: { current: 0, last: 0, change: 100 }
  },
  charts: { calls: [], alerts: [] },
  globalFilter: {
    start_time: subHours(new Date(), 72)
  }
}

export const CallsContext: Context<DashboardCallContextType> =
  createContext(initialState)
