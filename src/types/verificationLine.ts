import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationSortFilter, SearchFilter } from './filters'
import { PaginationParams, SearchParams } from './api'

export interface VerificationLine {
  id?: string
  phone: string
  status: boolean
  created_by?: string
  created_at?: string
}

export type GetPayload = PaginationParams &
  SearchParams &
  DateFilter & { sort?: SortingState }

export type CreatePayload = Omit<VerificationLine, 'id' | 'status'>
export type UpdatePayload = Omit<VerificationLine, 'status'>

export interface State {
  data: VerificationLine[]
  total: number
  pagination: PaginationSortFilter
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface Actions {
  get: (params?: GetPayload, getTotal?: boolean) => Promise<void>
  create: (payload: CreatePayload) => Promise<boolean>
  update: (payload: UpdatePayload) => Promise<boolean>
  updateMany: (
    ids: string[],
    payload: Partial<VerificationLine>
  ) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
