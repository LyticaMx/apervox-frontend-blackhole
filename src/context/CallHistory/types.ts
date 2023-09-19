import { SortingState } from '@tanstack/react-table'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'

export interface Label {
  id: string
  name: string
  color: string
}

export interface Call {
  id: string
  source: string
  line: string
  target: string
  date: string
  carrier: string
  technique: string
  relevance: string
  priority: string
  type: string
  workedBy: string
  label?: Label
  otherLabel?: string
  transcription: boolean
}

export interface CallPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface CallPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface StaticFilter {
  priority?: string[]
  relevance?: string[]
  type?: string[]
  hasTranscription?: string[] // verificar este tipo
}

export interface ClassificationCounters {
  unclassified: number
  discarded: number
  relevant: number
  withTranscription: number
}

export interface CallState {
  data: Call[]
  total: number
  counters: ClassificationCounters
  pagination: CallPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: StaticFilter
}

export interface CallActions {
  getData: (
    params: CallPaginationParams & SearchParams & DateFilter & StaticFilter,
    getTotal?: boolean
  ) => Promise<void>
  updateEvidence: (id: string) => Promise<void>
  classify: (ids: string[], relevance: string) => Promise<boolean>
}

export interface ContextType extends CallState {
  actions?: CallActions
}
