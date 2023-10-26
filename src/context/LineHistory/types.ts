import { SortingState } from '@tanstack/react-table'
import { PaginationParams } from 'types/api'
import { PaginationFilter } from 'types/filters'

export interface LineEvent {
  id: string
  target: string
  endDate: string
  technique: string
  techniqueStatus: string
  techniqueStartDate: string
  techniqueEndDate: string
}

export interface LineHistoryPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface LineHistoryPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface LineHistoryStaticFilter {
  status?: string[]
}

export interface LineHistoryContextState {
  id?: string
  data: LineEvent[]
  pagination: LineHistoryPagination
  staticFilter: LineHistoryStaticFilter
}

export interface LineHistoryActions {
  setLineId: (lineId?: string) => void
  getData: (
    params?: LineHistoryPaginationParams & LineHistoryStaticFilter
  ) => Promise<void>
}

export interface ContextType extends LineHistoryContextState {
  actions?: LineHistoryActions
}
