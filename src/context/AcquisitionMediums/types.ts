import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationSortFilter, SearchFilter } from 'types/filters'
import { PaginationParams, SearchParams } from 'types/api'
import { AcquisitionMedium } from 'types/acquisitionMedium'

export type getDataPayload = PaginationParams &
  SearchParams &
  DateFilter & { sort?: SortingState }

export interface State {
  data: AcquisitionMedium[]
  total: number
  pagination: PaginationSortFilter
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface Actions {
  getData: (params?: getDataPayload, getTotal?: boolean) => Promise<void>
  create: (payload: Omit<AcquisitionMedium, 'id'>) => Promise<boolean>
  update: (payload: AcquisitionMedium) => Promise<boolean>
  delete: (id: string) => Promise<boolean>
  deleteAll: (ids: string[]) => Promise<boolean>
  toggleStatus: (id: string, status: boolean) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
