import { Context, createContext } from 'react'
import { GroupAuditContextState } from './types'

export const initialState: GroupAuditContextState = {
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

export const GroupAuditContext: Context<GroupAuditContextState> =
  createContext(initialState)
