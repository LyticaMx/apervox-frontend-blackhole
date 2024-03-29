import { SortingState } from '@tanstack/react-table'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'
import { Target, Technique } from 'types/technique'
import { DocumentType, RowsQuantity } from 'types/utils'

export interface TechniquesPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface TechniquesPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface TechniquesStaticFilter {
  priority?: string[]
  status?: string[]
  turn?: string[]
  withTargets?: boolean
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
  starts_at: string
  expires_at: string
  groups: string[]
  notificationDays: number
  notificationHours: number
  shift: string
  reportEvidenceEvery: string
  priority: string
  targets: Target[]
}

export interface Actions {
  get: (
    params?: TechniquesPaginationParams &
      SearchParams &
      DateFilter &
      TechniquesStaticFilter,
    getTotal?: boolean
  ) => Promise<void>
  create: (technique: TechniqueCreator) => Promise<boolean>
  deleteOne: (id: string) => Promise<boolean>
  deleteMany: (ids: string[]) => Promise<boolean>
  exportTable: (document: DocumentType, quantity: RowsQuantity) => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
