import { Filters, createAction } from 'types/contextReducer'
import { ModelAudit, ModelAuditPagination } from './types'

export enum Types {
  SET_MODEL_ID = 'modelAudits/setModelID',
  SET_DATA = 'modelAudits/setData',
  SET_TOTAL = 'modelAudits/setTotal',
  SET_PAGINATION = 'modelAudits/setPagination',
  SET_FILTERS = 'modelAudits/setFilters'
}

export const actions = {
  setModelID: createAction<Types, string | undefined>(Types.SET_MODEL_ID),
  setData: createAction<Types, ModelAudit[]>(Types.SET_DATA),
  setTotal: createAction<Types, number>(Types.SET_TOTAL),
  setPagination: createAction<Types, ModelAuditPagination>(
    Types.SET_PAGINATION
  ),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
