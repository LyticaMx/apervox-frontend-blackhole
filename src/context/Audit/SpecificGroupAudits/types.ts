import { SortingState } from '@tanstack/react-table'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'

export interface GroupAudit {
  id: string
  userId: string
  username: string
  action: string
  name: string
  createdAt: string
  newData?: any
  oldData?: any
}

export interface GroupAuditPaginationParams extends PaginationParams {
  sort?: SortingState
}
export interface GroupAuditPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface GroupAuditContextState {
  id?: string
  data: GroupAudit[]
  total: number
  pagination: GroupAuditPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface GroupAuditActions {
  setGroupId: (userId?: string) => void
  getData: (
    params?: GroupAuditPaginationParams & SearchParams & DateFilter,
    getTotal?: boolean
  ) => Promise<void>
}

export interface ContextType extends GroupAuditContextState {
  actions?: GroupAuditActions
}
