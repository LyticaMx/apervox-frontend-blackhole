import { Context, createContext } from 'react'
import { State } from './types'

export const initialState: State = {
  data: [
    {
      id: '04',
      name: 'FXS / FXSO',
      created_at: '2023-01-21T20:19:23.032Z'
    }
  ],
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

export const DevicesContext: Context<State> = createContext(initialState)
