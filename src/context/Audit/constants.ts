import { Audit, AuditPagination } from 'types/audit'
import { createAction } from 'types/contextReducer'
import { DateFilter } from 'types/filters'

export enum Types {
  SET_AUDITS = 'audit/setAudits',
  SET_AUDITS_PAGINATION = 'audit/setAuditPagination',
  SET_GLOBAL_FILTERS = 'audit/setGlobalFilters'
}

export const actions = {
  setAudits: createAction<Types, Audit[]>(Types.SET_AUDITS),
  setAuditsPagination: createAction<Types, AuditPagination>(
    Types.SET_AUDITS_PAGINATION
  ),
  setGlobalFilters: createAction<Types, DateFilter>(Types.SET_GLOBAL_FILTERS)
}
