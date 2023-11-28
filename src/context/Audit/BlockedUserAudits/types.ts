import { SearchParams } from 'types/api'
import { AuditContextState, AuditPaginationParams } from '../types'
import { DateFilter } from 'types/filters'

export interface AuditActions {
  getData: (
    params?: AuditPaginationParams & SearchParams & DateFilter,
    getTotal?: boolean
  ) => Promise<void>
}

export interface ContextType extends AuditContextState {
  actions?: AuditActions
}
