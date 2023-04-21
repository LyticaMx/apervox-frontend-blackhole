import { SortingState } from '@tanstack/react-table'
import { Priority } from './priority'
import { DateFilter, PaginationFilter, SearchFilter } from './filters'
import { Status } from './status'
import { PaginationParams, SearchParams } from './api'

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

export interface WorkGroup {
  id?: string
  name: string
  description: string
  registered_by?: string
  updated_by?: string
  total_users?: number
  created_at?: string
  updated_at?: string
  techniques?: WorkGroupTechniques
  techniquesIds?: string[]
  users?: InnerWorkgroupUser[]
  userIds?: string[]
  status?: boolean | Status
}

export interface WorkGroupTechniques {
  assigned: number
  current: number
  to_conclude: number
  concluded: number
}

export interface WorkGroupHistory {
  id: string
  action: string
  description: string
  user: string
  created_at: string
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
  time_on_platform: string
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

export interface WorkgroupState {
  selected: WorkGroup
  workGroups: WorkGroup[]
  history: WorkGroupHistory[]
  users: GenericItem[]
  techniques: GenericItem[]
  associatedUsers: WorkGroupUser[]
  associatedTechniques: WorkGroupTechnique[]
  dateFilter: DateFilter
  searchFilter: SearchFilter
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
  getUsers: () => Promise<boolean>
  getTechniques: () => Promise<boolean>
  getHistory: (id: string) => Promise<boolean>
  getWorkGroups: (
    params?: WorkgroupPaginationParams & SearchParams & DateFilter
  ) => Promise<void>
  getWorkGroupUsers: (
    params?: WorkgroupPaginationParams & SearchParams
  ) => Promise<void>
  getWorkGroupTechniques: (
    id: string,
    params?: Partial<PaginationFilter>
  ) => Promise<boolean>
  updateStatusWorkGroup: (id: string, status: boolean) => Promise<boolean>
  deleteWorkGroup: (id: string) => Promise<boolean>
  deleteWorkGroups: (id: string[]) => Promise<boolean>
  deleteUsersOfWorkGroup: (ids: string[]) => Promise<boolean>
  deleteTechniqueOfWorkGroup?: (id: string) => Promise<boolean>
  createWorkGroup: (params: WorkGroup) => Promise<boolean>
  updateWorkGroup: (params: WorkGroup) => Promise<boolean>
  selectWorkGroup: (params?: WorkGroup) => void
}

export interface ContextType extends WorkgroupState {
  actions?: WorkgroupActions
}
