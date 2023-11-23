import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationSortFilter, SearchFilter } from './filters'
import { PaginationParams, SearchParams } from './api'
import { DocumentType, RowsQuantity } from './utils'

export type LineStatus = 'available' | 'assigned' | 'quarantine' | 'maintenance'
export interface OverflowLine {
  id?: string
  phone: string // Derivación
  medium_id: string
  medium: {
    id: string
    name?: string
  }
  target?: {
    phone: string
    carrier: string
    technique: string
  }
  created_by?: string
  created_at?: string
  releaseDate?: string
  line_status: LineStatus
  status: boolean
}

export interface StaticFilter {
  line_status?: string[]
}

export type GetPayload = PaginationParams &
  SearchParams &
  DateFilter &
  StaticFilter & { sort?: SortingState }

export type CreatePayload = Pick<OverflowLine, 'phone' | 'medium_id'>
export type UpdatePayload = Pick<OverflowLine, 'id' | 'phone' | 'medium_id'>
export type TotalsLines = Record<'all' | LineStatus, number>

export interface State {
  data: OverflowLine[]
  totals: TotalsLines
  pagination: PaginationSortFilter
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: StaticFilter
}

export interface Actions {
  get: (params?: GetPayload, getTotal?: boolean) => Promise<void>
  create: (payload: CreatePayload) => Promise<boolean>
  update: (payload: UpdatePayload) => Promise<boolean>
  updateMaintenance: (id: string, release: boolean) => Promise<boolean>
  updateQuarantine: (id: string, release: boolean) => Promise<boolean>
  updateMany: (
    ids: string[],
    payload: Partial<OverflowLine>
  ) => Promise<boolean>
  exportTable: (
    exportType: DocumentType,
    quantity: RowsQuantity
  ) => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
