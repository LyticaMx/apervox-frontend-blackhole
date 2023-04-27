import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'
import { PaginationParams, SearchParams } from 'types/api'
import { Label } from 'types/label'

export interface LabelsPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface LabelsPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface State {
  data: Label[]
  pagination: LabelsPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface Actions {
  getData: (
    params?: LabelsPaginationParams & SearchParams & DateFilter
  ) => Promise<void>
  create: (payload: Label) => Promise<boolean>
  update: (payload: Label) => Promise<boolean>
  delete: (id: string) => Promise<boolean>
  deleteAll: (ids: string[]) => Promise<boolean>
  toggleStatus: (id: string, status: boolean) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
