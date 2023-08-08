import { SortingState } from '@tanstack/react-table'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'

export interface LiveCall {
  id: string
  target: string
  carrier: string
  technique: string
  priority: string
  type: string
  status: string
  date: string
}

export interface LiveCallPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface LiveCallPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface StaticFilter {
  priority?: string[]
  callType?: string[]
  status?: string[]
}

export interface CallCounters {
  totalHanged: number
  totalVerification: number
  totalTrash: number
  totalTechnique: number
}

export interface LiveCallState {
  data: LiveCall[]
  total: number
  counters: CallCounters
  pagination: LiveCallPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: StaticFilter
}

export interface LiveCallActions {
  getData: (
    params: LiveCallPaginationParams & SearchParams & DateFilter & StaticFilter,
    getTotal?: boolean
  ) => Promise<void>
  hangUp: (id: string) => Promise<boolean>
}

export interface ContextType extends LiveCallState {
  actions?: LiveCallActions
}
