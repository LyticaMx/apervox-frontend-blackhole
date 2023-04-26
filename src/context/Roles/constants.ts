import { createAction, Filters } from 'types/contextReducer'
import { RolesPagination } from './types'
import { Role } from 'types/auth'

export enum Types {
  SET_DATA = 'roles/setData',
  SET_PAGINATION = 'roles/setPagination',
  SET_FILTERS = 'roles/setFilters'
}

export const actions = {
  setData: createAction<Types, Role[]>(Types.SET_DATA),
  setPagination: createAction<Types, RolesPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters>(Types.SET_FILTERS)
}
