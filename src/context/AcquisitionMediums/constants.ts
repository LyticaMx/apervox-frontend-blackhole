import { AcquisitionMedium } from 'types/acquisitionMedium'
import { createAction, Filters } from 'types/contextReducer'
import { PaginationSortFilter } from 'types/filters'

export enum Types {
  SET_DATA = 'mediums/setData',
  SET_PAGINATION = 'mediums/setPagination',
  SET_FILTERS = 'mediums/setFilters',
  SET_TOTAL = 'mediums/setTotal'
}

export const actions = {
  setData: createAction<Types, AcquisitionMedium[]>(Types.SET_DATA),
  setPagination: createAction<Types, PaginationSortFilter>(
    Types.SET_PAGINATION
  ),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS),
  setTotal: createAction<Types, number>(Types.SET_TOTAL)
}
