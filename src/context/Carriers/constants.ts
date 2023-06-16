import { Carrier } from 'types/Carrier'
import { createAction, Filters } from 'types/contextReducer'
import { Pagination } from './types'

export enum Types {
  SET_DATA = 'carriers/setData',
  SET_PAGINATION = 'carriers/setPagination',
  SET_FILTERS = 'carriers/setFilters',
  SET_TOTAL = 'carriers/setTotal'
}

export const actions = {
  setData: createAction<Types, Carrier[]>(Types.SET_DATA),
  setPagination: createAction<Types, Pagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS),
  setTotal: createAction<Types, number>(Types.SET_TOTAL)
}
