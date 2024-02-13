import { Context, createContext } from 'react'
import { ContextType, State } from './types'

export const initialState: State = {
  data: [],
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

export const LabelsContext: Context<ContextType> = createContext(initialState)
