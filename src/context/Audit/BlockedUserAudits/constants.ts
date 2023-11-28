import { Filters, createAction } from 'types/contextReducer'
import { Audit, AuditPagination } from '../types'

export enum Types {
  SET_DATA = 'blockedUserAudits/setData',
  SET_TOTAL = 'blockedUserAudits/setTotal',
  SET_PAGINATION = 'blockedUserAudits/setPagination',
  SET_FILTERS = 'blockedUserAudits/setFilters'
}

export const actions = {
  setData: createAction<Types, Audit[]>(Types.SET_DATA),
  setTotal: createAction<Types, number>(Types.SET_TOTAL),
  setPagination: createAction<Types, AuditPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
