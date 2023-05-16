import { Context, createContext } from 'react'
import { OverflowLineContextState } from 'types/overflowLine'

export const initialState: OverflowLineContextState = {
  data: [],
  total: 0,
  pagination: {
    limit: 15,
    limitOptions: [15, 25, 50, 100],
    page: 1,
    sort: [],
    totalRecords: 0
  },
  searchFilter: {},
  dateFilter: {},
  staticFilter: {}
}

export const OverflowLineContext: Context<OverflowLineContextState> =
  createContext(initialState)
