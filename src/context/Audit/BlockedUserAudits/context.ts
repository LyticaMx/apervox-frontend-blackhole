import { Context, createContext } from 'react'
import { AuditContextState } from '../types'

export const initialState: AuditContextState = {
  data: [],
  dateFilter: {},
  pagination: {
    limit: 15,
    page: 1,
    sort: [],
    totalRecords: 0,
    limitOptions: [15, 25, 50, 100]
  },
  searchFilter: {},
  total: 0
}

export const BlockedUserAuditsContext: Context<AuditContextState> =
  createContext(initialState)
