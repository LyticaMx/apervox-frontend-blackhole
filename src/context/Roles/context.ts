import { createContext, Context } from 'react'
import { RolesContextType } from 'types/roles'

export const initialState: RolesContextType = {
  list: [],
  pagination: {
    currentPage: 0,
    currentSize: 10,
    totalRecords: 0,
    rowsPerPageOptions: [10, 25, 50, 100, 300, 500, 1000]
  }
}

export const RolesContext: Context<RolesContextType> =
  createContext(initialState)
