import { NonEmptyArray } from './utils'

export interface DateFilter {
  start_time?: Date
  end_time?: Date
}

export interface PaginationFilter {
  page: number
  limit: number
  limitOptions?: NonEmptyArray<number>
}
