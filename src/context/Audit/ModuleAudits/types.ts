import { SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import {
  AuditPaginationParams,
  AuditContextState as GeneralContextState
} from '../types'

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
  AUTH = 'auth',
  METADATA = 'metadata',
  CALL_EVIDENCES = 'call_evidences',
  PASSWORD_RESET = 'password_reset',
  HANGUP = 'hangup',
  REGION = 'region',
  SYNOPSIS = 'synopsis',
  TRANSCRIPTION = 'transcription'
}

export enum AuditableActions {
  GET_IN = 'get_in',
  SEARCH = 'search'
}

export interface AuditedUser {
  name: string
  surnames: string
  email: string
  createdBy: string
  createdOn: Date
  extension: string
  groups: string
  id: string
  position: string
  username: string
  userRol: string
}

export interface StaticFilter {
  module?: string[]
}

export interface AuditContextState extends GeneralContextState {
  staticFilter: StaticFilter
}
export interface AuditActions {
  getData: (
    params?: AuditPaginationParams & SearchParams & DateFilter & StaticFilter,
    getTotal?: boolean
  ) => Promise<void>
  genAudit: (
    moduleName: AuditableModules,
    action?: AuditableActions,
    name?: string
  ) => Promise<void>
  getAuditedUser: (id: string) => Promise<AuditedUser | null>
}

export interface ContextType extends AuditContextState {
  actions?: AuditActions
}
