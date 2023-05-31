import { Context, createContext } from 'react'
import { State, ContextType } from './types'

export const initialState: State = {
  data: [],
  dateFilter: {},
  pagination: {
    limit: 15,
    page: 1,
    sort: [],
    totalRecords: 0
  },
  searchFilter: {},
  staticFilter: {},
  total: 0
}

export const TechniquesContext: Context<ContextType> =
  createContext(initialState)
