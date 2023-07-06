import { createAction, Filters } from 'types/contextReducer'
import { PaginationSortFilter } from 'types/filters'
import { Target } from 'types/technique'

export enum Types {
  SET_DATA = 'targets/setData',
  SET_PAGINATION = 'targets/setPagination',
  SET_TOTAL = 'targets/setTotal',
  SET_FILTERS = 'targets/setFilters'
}

export const actions = {
  setData: createAction<Types, Target[]>(Types.SET_DATA),
  setTotal: createAction<Types, number>(Types.SET_TOTAL),
  setPagination: createAction<Types, PaginationSortFilter>(
    Types.SET_PAGINATION
  ),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
