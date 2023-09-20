import { SortingState } from '@tanstack/react-table'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'

export interface UserAudit {
  id: string
  userId: string
  username: string
  action: string
  name: string
  createdAt: string
}

export interface UserAuditPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface UserAuditPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface UserAuditContextState {
  id?: string
  data: UserAudit[]
  total: number
  pagination: UserAuditPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface UserAuditActions {
  setUserId: (userId?: string) => void
  getData: (
    params?: UserAuditPaginationParams & SearchParams & DateFilter,
    getTotal?: boolean
  ) => Promise<void>
}

export interface ContextType extends UserAuditContextState {
  actions?: UserAuditActions
}
