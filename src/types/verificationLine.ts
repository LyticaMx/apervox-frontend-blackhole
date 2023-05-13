import { SortingState } from '@tanstack/react-table'
import { DateFilter, PaginationFilter, SearchFilter } from './filters'
import { PaginationParams } from './api'

export interface VerificationLine {
  id?: string
  phone: string
  createdBy?: string
  createdOn?: string
}

export interface VerificationLinePagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface VerificationLinePaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface VerificationLineContextState {
  data: VerificationLine[]
  total: number
  pagination: VerificationLinePagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
}

export interface VerificationLineContextActions {
  get: (
    params?: VerificationLinePaginationParams & SearchFilter & DateFilter,
    getTotal?: boolean
  ) => Promise<void>
  create: (line: VerificationLine) => Promise<boolean>
  update: (line: VerificationLine) => Promise<boolean>
  deleteOne: (id: string) => Promise<boolean>
  deleteMany: (ids: string[]) => Promise<boolean>
}

export interface VerificationLineContextType
  extends VerificationLineContextState {
  actions?: VerificationLineContextActions
}
