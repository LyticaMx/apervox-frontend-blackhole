import { Context, createContext } from 'react'
import { LocationContextState, LocationContextType } from 'types/location'

export const initialState: LocationContextState = {
  data: [],
  dateFilter: {},
  pagination: { limit: 15, page: 1, totalRecords: 0 },
  searchFilter: {},
  total: 0
}

export const LocationContext: Context<LocationContextType> =
  createContext(initialState)
