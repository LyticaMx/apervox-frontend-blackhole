import { Filters, createAction } from 'types/contextReducer'
import {
  CallCounters,
  LiveCall,
  LiveCallPagination,
  StaticFilter
} from './types'

export enum Types {
  SET_DATA = 'monitoring/setData',
  SET_TOTAL = 'monitoring/setTotal',
  SET_COUNTERS = 'monitoring/setCounters',
  SET_PAGINATION = 'monitoring/setPagination',
  SET_FILTERS = 'monitoring/setFilters'
}

export const actions = {
  setData: createAction<Types, LiveCall[]>(Types.SET_DATA),
  setTotal: createAction<Types, number>(Types.SET_TOTAL),
  setCounters: createAction<Types, CallCounters>(Types.SET_COUNTERS),
  setPagination: createAction<Types, LiveCallPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters<StaticFilter>>(Types.SET_FILTERS)
}
