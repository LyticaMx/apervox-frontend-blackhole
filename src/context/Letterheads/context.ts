import { Context, createContext } from 'react'
import { State } from './types'

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
  dateFilter: {}
}

export const LetterheadsContext: Context<State> = createContext(initialState)
