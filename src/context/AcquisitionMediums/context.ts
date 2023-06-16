import { Context, createContext } from 'react'
import { State } from './types'

export const initialState: State = {
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
  dateFilter: {}
}

export const AcquisitionMediumsContext: Context<State> =
  createContext(initialState)
