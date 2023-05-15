import { Context, createContext } from 'react'
import { VerificationLineContextState } from 'types/verificationLine'

export const initialState: VerificationLineContextState = {
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

export const VerificationLineContext: Context<VerificationLineContextState> =
  createContext(initialState)