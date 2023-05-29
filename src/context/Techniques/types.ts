import { SortingState } from '@tanstack/react-table'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'
import { Technique } from 'types/technique'

export interface TechniquesPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface TechniquesPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface TechniquesStaticFilter {
  priotiry?: string[]
  status?: string[]
  turn?: string[]
}

export interface State {
  data: Technique[]
  total: number
  pagination: TechniquesPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: TechniquesStaticFilter
}

export interface TechniqueCreator {
  name: string
  description: string
  expires_at: string
  groups: any[]
  notificationTimeUnit: 'days' | 'hours'
  notificationTime: number
  shift: string
  reportEvidenceEvery: string
  priority: string
  targets: any[]
  etsiTargets: any[]
}

export interface Actions {
  get: (
    params?: TechniquesPaginationParams &
      SearchParams &
      DateFilter &
      TechniquesStaticFilter,
    getTotal?: boolean
  ) => Promise<void>
  // create: (technique: TechniqueCreator) => Promise<boolean>
  deleteOne: (id: string, full?: boolean) => Promise<boolean>
  deleteMany: (ids: string[], full?: boolean) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
