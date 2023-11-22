import { Context, createContext } from 'react'
import { CallState } from './types'

export const initialState: CallState = {
  data: [],
  counters: {
    notRelevant: 0,
    relevant: 0,
    unclassified: 0,
    withTranscription: 0
  },
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

export const CallHistoryContext: Context<CallState> =
  createContext(initialState)
