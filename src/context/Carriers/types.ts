import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'
import { PaginationParams, SearchParams } from 'types/api'
import { Carrier } from 'types/Carrier'

export interface Pagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface CarriersPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface State {
  data: Carrier[]
  total: number
  pagination: Pagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface Actions {
  getData: (
    params?: CarriersPaginationParams & SearchParams & DateFilter,
    getTotal?: boolean
  ) => Promise<void>
  create: (payload: Omit<Carrier, 'id'>) => Promise<boolean>
  update: (payload: Carrier) => Promise<boolean>
  delete: (id: string) => Promise<boolean>
  deleteAll: (ids: string[]) => Promise<boolean>
  toggleStatus: (id: string, status: boolean) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
