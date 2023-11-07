import { SortingState } from '@tanstack/react-table'
import { CallEvidenceForSocket } from 'context/LiveCallSocket'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'
import { DocumentType } from 'types/utils'

export interface LiveCall {
  id: string
  target: string
  carrier: string
  technique: string
  priority: string
  type: string
  status: string
  date: string
  endedAt?: string
}

export interface LiveCallPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface LiveCallPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface StaticFilter {
  priority?: string[]
  callType?: string[]
  status?: string[]
}

export interface CallCounters {
  totalHanged: number
  totalVerification: number
  totalTrash: number
  totalTechnique: number
}

export interface LiveCallState {
  data: LiveCall[]
  total: number
  counters: CallCounters
  pagination: LiveCallPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: StaticFilter
}

export interface LiveCallActions {
  /**
   * @deprecated
   * @param params
   * @param getTotal
   * @returns Promise<void>
   */
  getData: (
    params: LiveCallPaginationParams & SearchParams & DateFilter & StaticFilter,
    getTotal?: boolean
  ) => Promise<void>
  getAllData: (getTotal?: boolean) => Promise<void>
  hangUp: (id: string) => Promise<boolean>
  addLiveCall: (call: CallEvidenceForSocket) => void
  updateLiveCall: (call: CallEvidenceForSocket) => void
  removeLiveCall: (id: string) => void
  exportTable: (document: DocumentType) => Promise<void>
}

export interface ContextType extends LiveCallState {
  actions?: LiveCallActions
}
