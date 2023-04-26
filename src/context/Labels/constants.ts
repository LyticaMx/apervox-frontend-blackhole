import { createAction } from 'types/contextReducer'
import { DateFilter, SearchFilter } from 'types/filters'
import { LabelsPagination } from './types'
import { Role } from 'types/auth'

export enum Types {
  SET_DATA = 'labels/setData',
  SET_PAGINATION = 'labels/setPagination',
  SET_FILTERS = 'labels/setFilters',
  SET_DATE_FILTERS = 'labels/setDateFilters'
}

export const actions = {
  setData: createAction<Types, Role[]>(Types.SET_DATA),
  setPagination: createAction<Types, LabelsPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, SearchFilter>(Types.SET_FILTERS),
  setDateFilters: createAction<Types, DateFilter>(Types.SET_DATE_FILTERS)
}
