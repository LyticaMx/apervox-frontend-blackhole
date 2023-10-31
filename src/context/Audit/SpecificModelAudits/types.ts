import { SortingState } from '@tanstack/react-table'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'

export interface ModelAudit {
  id: string
  userId: string
  username: string
  action: string
  name: string
  createdAt: string
  newData?: any
  oldData?: any
}

export interface ModelAuditPaginationParams extends PaginationParams {
  sort?: SortingState
}
export interface ModelAuditPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface ModelAuditContextState {
  id?: string
  data: ModelAudit[]
  total: number
  pagination: ModelAuditPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface ModelAuditActions {
  setModelId: (userId?: string) => void
  getData: (
    params?: ModelAuditPaginationParams & SearchParams & DateFilter,
    getTotal?: boolean
  ) => Promise<void>
}

export interface ContextType extends ModelAuditContextState {
  actions?: ModelAuditActions
}
