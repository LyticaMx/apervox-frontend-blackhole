import { Audit, AuditPagination } from '../types'
import { Filters, createAction } from 'types/contextReducer'

export enum Types {
  SET_DATA = 'loginAudits/setData',
  SET_TOTAL = 'loginAudits/setTotal',
  SET_PAGINATION = 'loginAudits/setPagination',
  SET_FILTERS = 'loginAudits/setFilters'
}

export const actions = {
  setData: createAction<Types, Audit[]>(Types.SET_DATA),
  setTotal: createAction<Types, number>(Types.SET_TOTAL),
  setPagination: createAction<Types, AuditPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
