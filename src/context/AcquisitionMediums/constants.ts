import { AcquisitionMedium } from 'types/acquisitionMedium'
import { createAction, Filters } from 'types/contextReducer'
import { PaginationSortFilter } from 'types/filters'

export enum Types {
  SET_DATA = 'labels/setData',
  SET_PAGINATION = 'labels/setPagination',
  SET_FILTERS = 'labels/setFilters'
}

export const actions = {
  setData: createAction<Types, AcquisitionMedium[]>(Types.SET_DATA),
  setPagination: createAction<Types, PaginationSortFilter>(
    Types.SET_PAGINATION
  ),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
