import { SortingState } from '@tanstack/react-table'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'

export interface Label {
  id: string
  name: string
  color: string
}

export interface Evidence {
  id: string
  evidenceNumber: number
  targetPhone: string
  sourceNumber: string
  callStartDate: string
  callEndDate: string
  duration: number
  carrier: string
  technique: string
  auditedBy: string
  isTracked: boolean
  trackedBy: string
  workingBy: string
  label?: Label
  otherLabel?: string
  relevance: string
  hasTranscription: boolean

  // Campos ETSII
  imei?: string
  imsi?: string
  code_cell_start?: string
  direction_cell_start?: string
  region_cell_start?: string
  obtained_from?: string
}

export interface EvidencePaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface EvidencePagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface StaticFilter {
  follow?: string[]
  relevance?: string[]
}

export interface EvidenceState {
  data: Evidence[]
  total: number
  pagination: EvidencePagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: StaticFilter
}

export interface EvidenceActions {
  getData: (
    params?: EvidencePaginationParams &
      SearchParams &
      DateFilter &
      StaticFilter,
    getTotal?: boolean
  ) => Promise<void>
}

export interface ContextType extends EvidenceState {
  actions?: EvidenceActions
}
