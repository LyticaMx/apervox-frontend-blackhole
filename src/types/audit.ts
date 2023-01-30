import { PaginationParams } from './api'
import { DatesFilterForm } from './datesFilter'
import { DateFilter, PaginationFilter } from './filters'

export interface Param {
  name: string
  value: any
  type: string
}
export interface Audit {
  date: string
  module: string
  action: string
  params: Param[]
}

export interface AuditListParams extends DateFilter, Partial<PaginationFilter> {
  id: string
}
export interface AuditPagination extends PaginationFilter {
  totalRecords: number
}

export interface AuditContextState {
  listOfAudits: Audit[]
  auditPagination: AuditPagination
  globalFilter: DateFilter
}

export interface AuditContextActions {
  getListOfAudits: (params: AuditListParams) => Promise<void>
  resetList: () => void
  setGlobalFilters: (params: DatesFilterForm) => Promise<void>
}

export interface AuditContextType extends AuditContextState {
  actions?: AuditContextActions
}
