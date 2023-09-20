import { Filters, createAction } from 'types/contextReducer'
import { UserAudit, UserAuditPagination } from './types'

export enum Types {
  SET_USER_ID = 'userAudits/setUserID',
  SET_DATA = 'userAudits/setData',
  SET_TOTAL = 'userAudits/setTotal',
  SET_PAGINATION = 'userAudits/setPagination',
  SET_FILTERS = 'userAudits/setFilters'
}

export const actions = {
  setUserID: createAction<Types, string | undefined>(Types.SET_USER_ID),
  setData: createAction<Types, UserAudit[]>(Types.SET_DATA),
  setTotal: createAction<Types, number>(Types.SET_TOTAL),
  setPagination: createAction<Types, UserAuditPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
