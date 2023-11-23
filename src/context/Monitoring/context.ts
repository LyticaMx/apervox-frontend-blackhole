import { Context, createContext } from 'react'
import { LiveCallState } from './types'

export const initialState: LiveCallState = {
  data: [],
  counters: {
    totalHanged: 0,
    totalTechnique: 0,
    totalTrash: 0,
    totalVerification: 0
  },
  dateFilter: {},
  total: 0,
  totalHanged: 0,
  pagination: {
    limit: 15,
    limitOptions: [15, 25, 50, 100],
    page: 1,
    sort: [],
    totalRecords: 0
  },
  searchFilter: {},
  staticFilter: {}
}

export const MonitoringContext: Context<LiveCallState> =
  createContext(initialState)
