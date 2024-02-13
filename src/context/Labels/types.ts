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

export interface StaticFilters {
  label_type?: string
}

export interface State {
  data: Label[]
  pagination: LabelsPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: StaticFilters
}
export type PayloadGet = LabelsPaginationParams &
  SearchParams &
  DateFilter &
  StaticFilters
export type PayloadCreate = Omit<Label, 'id' | 'created_at'>
export type PayloadUpdate = Omit<Label, 'created_at'>

export interface Actions {
  getData: (params?: PayloadGet) => Promise<void>
  create: (payload: PayloadCreate) => Promise<boolean>
  update: (payload: PayloadUpdate) => Promise<boolean>
  delete: (id: string) => Promise<boolean>
  deleteAll: (ids: string[]) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
