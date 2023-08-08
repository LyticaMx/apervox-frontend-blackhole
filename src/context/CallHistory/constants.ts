import { Filters, createAction } from 'types/contextReducer'
import {
  Call,
  CallPagination,
  ClassificationCounters,
  StaticFilter
} from './types'

export enum Types {
  SET_DATA = 'callHistory/setData',
  SET_TOTAL = 'callHistory/setTotal',
  SET_COUNTERS = 'callHistory/setCounters',
  SET_PAGINATION = 'callHistory/setPagination',
  SET_FILTERS = 'callHistory/setFilters'
}

export const actions = {
  setData: createAction<Types, Call[]>(Types.SET_DATA),
  setTotal: createAction<Types, number>(Types.SET_TOTAL),
  setCounters: createAction<Types, ClassificationCounters>(Types.SET_COUNTERS),
  setPagination: createAction<Types, CallPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters<StaticFilter>>(Types.SET_FILTERS)
}
