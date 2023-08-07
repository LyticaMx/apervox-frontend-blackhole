import { Filters, createAction } from 'types/contextReducer'
import { Evidence, EvidencePagination, StaticFilter } from './types'

export enum Types {
  SET_DATA = 'evidences/setData',
  SET_TOTAL = 'evidences/setTotal',
  SET_PAGINATION = 'evidences/setPagination',
  SET_FILTERS = 'evidences/setFilters'
}

export const actions = {
  setData: createAction<Types, Evidence[]>(Types.SET_DATA),
  setTotal: createAction<Types, number>(Types.SET_TOTAL),
  setPagination: createAction<Types, EvidencePagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters<StaticFilter>>(Types.SET_FILTERS)
}
