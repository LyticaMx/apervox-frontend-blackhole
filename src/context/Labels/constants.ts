import { createAction, Filters } from 'types/contextReducer'
import { LabelsPagination } from './types'
import { Role } from 'types/auth'

export enum Types {
  SET_DATA = 'labels/setData',
  SET_PAGINATION = 'labels/setPagination',
  SET_FILTERS = 'labels/setFilters'
}

export const actions = {
  setData: createAction<Types, Role[]>(Types.SET_DATA),
  setPagination: createAction<Types, LabelsPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
