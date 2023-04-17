import { NonEmptyArray } from './utils'

export interface DateFilter {
  start_time?: Date
  end_time?: Date
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
