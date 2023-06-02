import { Context, createContext } from 'react'
import { State } from 'types/overflowLine'

export const initialState: State = {
  data: [],
  totals: {
    all: 0,
    assigned: 0,
    available: 0,
    maintenance: 0,
    quarantine: 0
  },
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

export const OverflowLineContext: Context<State> = createContext(initialState)
