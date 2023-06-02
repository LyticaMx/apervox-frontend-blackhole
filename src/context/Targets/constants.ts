import { createAction, Filters } from 'types/contextReducer'
import { Device } from 'types/device'
import { PaginationSortFilter } from 'types/filters'

export enum Types {
  SET_DATA = 'targets/setData',
  SET_PAGINATION = 'targets/setPagination',
  SET_FILTERS = 'targets/setFilters'
}

export const actions = {
  setData: createAction<Types, Device[]>(Types.SET_DATA),
  setPagination: createAction<Types, PaginationSortFilter>(
    Types.SET_PAGINATION
  ),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
