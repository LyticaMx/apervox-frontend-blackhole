import { Filters, createAction } from 'types/contextReducer'
import { GroupAudit, GroupAuditPagination } from './types'

export enum Types {
  SET_GROUP_ID = 'groupAudits/setGroupID',
  SET_DATA = 'groupAudits/setData',
  SET_TOTAL = 'groupAudits/setTotal',
  SET_PAGINATION = 'groupAudits/setPagination',
  SET_FILTERS = 'groupAudits/setFilters'
}

export const actions = {
  setGroupID: createAction<Types, string | undefined>(Types.SET_GROUP_ID),
  setData: createAction<Types, GroupAudit[]>(Types.SET_DATA),
  setTotal: createAction<Types, number>(Types.SET_TOTAL),
  setPagination: createAction<Types, GroupAuditPagination>(
    Types.SET_PAGINATION
  ),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
