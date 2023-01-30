import { AxiosResponse } from 'axios'
import { DateFilter } from './filters'

export interface PageInfo {
  current_page: number
  has_next_page: boolean
  has_previous_page: boolean
  total_records: number
}

export interface LinkPages {
  base: string
  next: string
  previous: string
  self: string
}

export interface ResponseData {
  data: any
  i18key: string
  limit: number
  size: number
  start: number // page
  page_info: PageInfo
  _links: LinkPages
  error?: any
}

export interface CustomError extends AxiosResponse {
  error: number
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface GeneralParams extends PaginationParams, DateFilter {}

interface PropChange {
  [property: string]: any
}

export interface MultipleUpdateEntity {
  reference_id: string
  changes: PropChange
}
