import { SortingState } from '@tanstack/react-table'
import { NonEmptyArray } from './utils'

export interface DateFilter {
  start_time?: Date
  end_time?: Date
  clearDates?: boolean
}

export interface SearchFilter {
  query?: string
  filters?: string[]
}

export interface PaginationFilter {
  page: number
  limit: number
  limitOptions?: NonEmptyArray<number>
}

export interface PaginationSortFilter extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}
