import { Context, createContext } from 'react'
import { LineHistoryContextState } from './types'

export const initialState: LineHistoryContextState = {
  data: [],
  pagination: {
    limit: 15,
    page: 1,
    sort: [],
    totalRecords: 0,
    limitOptions: [15, 25, 50, 100]
  },
  staticFilter: {}
}

export const LineHistoryContext: Context<LineHistoryContextState> =
  createContext(initialState)
