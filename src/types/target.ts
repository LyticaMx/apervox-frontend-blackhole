import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationSortFilter, SearchFilter } from 'types/filters'
import { PaginationParams, SearchParams } from 'types/api'

export interface Target {
  id: string
  alias: string
  phone: string
  has_end_date: boolean
  end_date?: string
  status: boolean
  created_at: string
  updated_at: string

  carrier?: {
    id: string
    name: string
  }
  overflow_line?: {
    id: string
    phone: string
  }

  created_by?: any
  technique?: any
  updated_by?: any
}

// export interface ETSITarget {
//   id: string
//   name: string
//   phone: string
//   has_end_date: boolean
//   end_date?: string
//   carrier_id?: string
//   LIID: string
//   LIIDVoLTE: string
// }

export type getDataPayload = PaginationParams &
  SearchParams &
  DateFilter & {
    sort?: SortingState
    technique_id?: string
  }

export type createPayload = Omit<
  Target,
  'id' | 'status' | 'created_at' | 'updated_at'
> & {
  technique_id: string
  type: string
  carrier_id: string
  overflow_line_id: string
}
export type updatePayload = Omit<
  Target,
  'status' | 'created_at' | 'updated_at'
> & {
  type: string
  carrier_id: string
  overflow_line_id: string
}

export interface State {
  data: Target[]
  total: number
  pagination: PaginationSortFilter
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface Actions {
  getData: (params?: getDataPayload, getTotal?: boolean) => Promise<void>
  create: (payload: createPayload) => Promise<boolean>
  update: (payload: updatePayload) => Promise<boolean>
  delete: (id: string) => Promise<boolean>
  deleteMany: (ids: string[]) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
