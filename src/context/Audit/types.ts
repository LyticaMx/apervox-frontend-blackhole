import { SortingState } from '@tanstack/react-table'
import { PaginationParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'

export interface Audit {
  id: string
  userId: string
  username: string
  moduleName: string
  specificModule: string
  action: string
  name: string
  modelId: string
  old: Record<string, any>
  new: Record<string, any>
  createdAt: string
}

export interface AuditPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface AuditPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface AuditContextState {
  data: Audit[]
  total: number
  pagination: AuditPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}
