import { Context, createContext } from 'react'
import { UserAuditContextState } from './types'

export const initialState: UserAuditContextState = {
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

export const UserAuditContext: Context<UserAuditContextState> =
  createContext(initialState)
