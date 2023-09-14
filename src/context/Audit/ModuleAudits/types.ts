import { SortingState } from '@tanstack/react-table'
import { PaginationParams, SearchParams } from 'types/api'
import { DateFilter, PaginationFilter, SearchFilter } from 'types/filters'

export enum AuditableModules {
  ME = 'me',
  USERS = 'users',
  SESSIONS = 'sessions',
  ROLES = 'roles',
  GROUPS = 'groups',
  SETTINGS = 'settings',
  LABELS = 'labels',
  LETTERHEADS = 'letterheads',
  CARRIERS = 'carriers',
  ACQUISITION_MEDIUMS = 'acquisition_mediums',
  DEVICES = 'devices',
  OVERFLOW_LINES = 'overflow_lines',
  VERIFICATION_LINES = 'verification_lines',
  TECHNIQUES = 'techniques',
  TARGETS = 'targets',
  AUTH = 'auth'
}

export interface Audit {
  id: string
  userId: string
  username: string
  moduleName: string
  specificModule: string
  action: string
  name: string
  modelId: string
  old: Record<string, any>
  new: Record<string, any>
  createdAt: string
}

export interface AuditPaginationParams extends PaginationParams {
  sort?: SortingState
}

export interface AuditPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface StaticFilter {
  module?: string[]
}

export interface AuditContextState {
  data: Audit[]
  total: number
  pagination: AuditPagination
  dateFilter: DateFilter
  searchFilter: SearchFilter
  staticFilter: StaticFilter
}

export interface AuditActions {
  getData: (
    params?: AuditPaginationParams & SearchParams & DateFilter & StaticFilter,
    getTotal?: boolean
  ) => Promise<void>
  genAudit: (moduleName: AuditableModules) => Promise<void>
}

export interface ContextType extends AuditContextState {
  actions?: AuditActions
}
