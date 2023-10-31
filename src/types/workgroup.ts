import { SortingState } from '@tanstack/react-table'
import { Priority } from './priority'
import { DateFilter, PaginationFilter, SearchFilter } from './filters'
import { Status } from './status'
import { PaginationParams, SearchParams } from './api'
import { DocumentType, RowsQuantity } from './utils'

export enum TechiniqueStatus {
  ACTIVE,
  INACTIVE,
  TO_COMPLETE,
  COMPLETED,
  CURRENT
}

export enum Turn {
  MORNING = 'morning',
  EVENING = 'evening',
  NIGHTNING = 'nightning'
}

export interface InnerWorkgroupUser {
  id: string
  username: string
}

export interface InnerTecnique {
  id: string
  name: string
}

export interface WorkGroup {
  id?: string
  name: string
  description: string
  registered_by?: string
  updated_by?: string
  total_users?: number
  created_at?: string
  updated_at?: string
  techniquesByStatus?: WorkGroupTechniques
  techniques?: InnerTecnique[]
  users?: InnerWorkgroupUser[]
  userIds?: string[]
  techniqueIds?: string[]
  status?: boolean | Status
}

export interface WorkGroupTechniques {
  current: number
  concluding: number
  concluded: number
}

export interface WorkGroupUser {
  id: string
  name: string
  surnames: string
  username: string
  groups: string
  role: string
  status: Status
}

export interface WorkGroupTechnique {
  id: string
  name: string
  created_at: string
  expires_at: string
  registered_by: string
  total_objective: number
  priority: Priority
  turn_of_attention: Turn
  status: Status
}

export interface Pagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface GenericItem {
  id: string
  name: string
}

export interface WorkgroupStaticFilter {
  status?: string[]
  hasUsers?: string[]
  hasTechniques?: string[]
}

export interface WorkgroupState {
  selected: WorkGroup
  workGroups: WorkGroup[]
  users: GenericItem[]
  techniques: GenericItem[]
  associatedUsers: WorkGroupUser[]
  associatedTechniques: WorkGroupTechnique[]
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: WorkgroupStaticFilter
  totalWorkGroups: number
  workGroupsPagination: {
    limit: number
    page: number
    totalRecords: number
    sort: SortingState
  }
  usersPagination: {
    limit: number
    page: number
    totalRecords: number
    sort: SortingState
  }
  techniquesPagination: {
    limit: number
    page: number
    totalRecords: number
    sort: SortingState
  }
}

export interface WorkgroupPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface WorkgroupActions {
  getWorkGroups: (
    params?: WorkgroupPaginationParams &
      SearchParams &
      DateFilter &
      WorkgroupStaticFilter,
    getTotal?: boolean
  ) => Promise<void>
  getWorkGroupUsers: (
    params?: WorkgroupPaginationParams & SearchParams
  ) => Promise<void>
  getWorkGroupTechniques: (params?: WorkgroupPaginationParams) => Promise<void>
  updateStatusWorkGroup: (id: string, status: boolean) => Promise<boolean>
  deleteWorkGroup: (id: string) => Promise<boolean>
  deleteWorkGroups: (id: string[]) => Promise<boolean>
  deleteUsersOfWorkGroup: (ids: string[]) => Promise<boolean>
  deleteTechniquesOfWorkGroup?: (id: string[]) => Promise<boolean>
  createWorkGroup: (params: WorkGroup) => Promise<boolean>
  updateWorkGroup: (params: WorkGroup) => Promise<boolean>
  selectWorkGroup: (params?: WorkGroup) => void
  toggleDisableWorkGroups: (
    ids: string[],
    disable?: boolean
  ) => Promise<boolean>
  exportTable: (
    exportType: DocumentType,
    quantity: RowsQuantity
  ) => Promise<void>
}

export interface ContextType extends WorkgroupState {
  actions?: WorkgroupActions
}
