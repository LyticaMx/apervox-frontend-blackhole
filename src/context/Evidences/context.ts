import { Context, createContext } from 'react'
import { EvidenceState } from './types'

export const initialState: EvidenceState = {
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
  staticFilter: {},
  total: 0
}

export const EvidencesContext: Context<EvidenceState> =
  createContext(initialState)
