import { createAction, Filters } from 'types/contextReducer'
import { Device } from 'types/device'
import { PaginationSortFilter } from 'types/filters'

export enum Types {
  SET_DATA = 'devices/setData',
  SET_PAGINATION = 'devices/setPagination',
  SET_FILTERS = 'devices/setFilters',
  SET_TOTAL = 'devices/setTotal'
}

export const actions = {
  setData: createAction<Types, Device[]>(Types.SET_DATA),
  setPagination: createAction<Types, PaginationSortFilter>(
    Types.SET_PAGINATION
  ),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS),
  setTotal: createAction<Types, number>(Types.SET_TOTAL)
}
