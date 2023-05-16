import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationFilter, SearchFilter } from './filters'
import { PaginationParams, SearchParams } from './api'

export interface OverflowLine {
  id?: string
  phone: string // Derivación
  medium: {
    id: string
    name?: string
  }
  target?: {
    phone: string
    carrier: string
    technique: string
  }
  createdBy?: string
  createdOn?: string
  releaseDate?: string
  status?: 'available' | 'assigned' | 'quarantine' | 'maintenance'
  enabled?: boolean
}

export interface OverflowLinePaginaton extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface OverflowLinePaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface OverflowLineStaticFilter {
  status?: string[]
}

export interface OverflowLineContextState {
  data: OverflowLine[]
  total: number
  pagination: OverflowLinePaginaton
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: OverflowLineStaticFilter
}

export interface OverflowLineContextActions {
  get: (
    params?: OverflowLinePaginationParams &
      SearchParams &
      DateFilter &
      OverflowLineStaticFilter,
    getTotal?: boolean
  ) => Promise<void>
  create: (line: OverflowLine) => Promise<boolean>
  update: (line: OverflowLine) => Promise<boolean>
  deleteOne: (id: string) => Promise<boolean>
  deleteMany: (id: string[]) => Promise<boolean>
  toggleDisable: (id: string, enabled: boolean) => Promise<boolean>
}

export interface OverflowLineContextType extends OverflowLineContextState {
  actions?: OverflowLineContextActions
}
