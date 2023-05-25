import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationSortFilter, SearchFilter } from 'types/filters'
import { PaginationParams, SearchParams } from 'types/api'
import { Device } from 'types/device'

export type getDataPayload = PaginationParams &
  SearchParams &
  DateFilter & { sort?: SortingState }

export type createPayload = Omit<Device, 'id'>
export type updatePayload = Device

export interface State {
  data: Device[]
  pagination: PaginationSortFilter
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface Actions {
  getData: (params?: getDataPayload) => Promise<void>
  create: (payload: createPayload) => Promise<boolean>
  update: (payload: updatePayload) => Promise<boolean>
  delete: (id: string) => Promise<boolean>
  deleteAll: (ids: string[]) => Promise<boolean>
  toggleStatus: (id: string, status: boolean) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
