import { Carrier } from 'types/Carrier'
import { createAction, Filters } from 'types/contextReducer'
import { Pagination } from './types'

export enum Types {
  SET_DATA = 'labels/setData',
  SET_PAGINATION = 'labels/setPagination',
  SET_FILTERS = 'labels/setFilters'
}

export const actions = {
  setData: createAction<Types, Carrier[]>(Types.SET_DATA),
  setPagination: createAction<Types, Pagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
