import { PaginationParams } from './api'
import { DateFilter, PaginationFilter, SearchFilter } from './filters'

export interface Location {
  id: string
  cellId: string
  latitude: string
  longitude: string
  country?: string
  createdAt: string
}

interface LocationPagination extends PaginationFilter {
  totalRecords: number
}

export interface LocationContextState {
  data: Location[]
  total: number
  pagination: LocationPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface LocationContextActions {
  get: (
    params?: PaginationParams & SearchFilter & DateFilter,
    getTotal?: boolean
  ) => Promise<void>
}

export interface LocationContextType extends LocationContextState {
  actions?: LocationContextActions
}
