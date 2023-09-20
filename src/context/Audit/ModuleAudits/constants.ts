import { Filters, createAction } from 'types/contextReducer'
import { Audit, AuditPagination, StaticFilter } from './types'

export enum Types {
  SET_DATA = 'moduleAudits/setData',
  SET_TOTAL = 'moduleAudits/setTotal',
  SET_COUNTERS = 'moduleAudits/setCounters',
  SET_PAGINATION = 'moduleAudits/setPagination',
  SET_FILTERS = 'moduleAudits/setFilters'
}

export const actions = {
  setData: createAction<Types, Audit[]>(Types.SET_DATA),
  setTotal: createAction<Types, number>(Types.SET_TOTAL),
  setPagination: createAction<Types, AuditPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters<StaticFilter>>(Types.SET_FILTERS)
}
