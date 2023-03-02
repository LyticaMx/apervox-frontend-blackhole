import { SortingState } from '@tanstack/react-table'
import { Priority } from './priority'
import { PaginationFilter } from './filters'
import { Status } from './status'

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

export interface WorkGroup {
  id: string
  name: string
  description: string
  registered_by: string
  updated_by?: string
  total_users: number
  created_at: string
  updated_at?: string
  techniques: WorkGroupTechniques
  status: Status
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

export interface Pagination extends Partial<PaginationFilter> {
  totalRecords?: number
}

export interface GenericItem {
  id: string
  name: string
}

export interface State {
  selected: WorkGroup
  workGroups: WorkGroup[]
  history: WorkGroupHistory[]
  users: GenericItem[]
  techniques: GenericItem[]
  associatedUsers: WorkGroupUser[]
  associatedTechniques: WorkGroupTechnique[]
  workGroupsPagination: {
    limit: number
    page: number
    totalRecords: number
  }
  usersPagination: {
    limit: number
    page: number
    totalRecords: number
  }
  techniquesPagination: {
    limit: number
    page: number
    totalRecords: number
  }
}

export interface Actions {
  getUsers: () => Promise<boolean>
  getTechniques: () => Promise<boolean>
  getHistory: (id: string) => Promise<boolean>
  getWorkGroups: (
    filters?: SortingState,
    params?: Partial<PaginationFilter>
  ) => Promise<boolean>
  getWorkGroupUsers: (
    id: string,
    params?: Partial<PaginationFilter>
  ) => Promise<boolean>
  getWorkGroupTechniques: (
    id: string,
    params?: Partial<PaginationFilter>
  ) => Promise<boolean>
  updateStatusWorkGroup?: (id: string, active: boolean) => Promise<boolean>
  deleteWorkGroup?: (id: string) => Promise<boolean>
  deleteUserOfWorkGroup?: (id: string) => Promise<boolean>
  deleteTechniqueOfWorkGroup?: (id: string) => Promise<boolean>
  createWorkGroup?: (params: WorkGroup) => Promise<boolean>
  updateWorkGroup?: (params: WorkGroup) => Promise<boolean>
  selectWorkGroup: (params?: WorkGroup) => void
}

export interface ContextType extends State {
  actions?: Actions
}
