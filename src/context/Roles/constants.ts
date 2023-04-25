import { createAction } from 'types/contextReducer'
import { DateFilter, SearchFilter } from 'types/filters'
import { RolesPagination } from './types'
import { Role } from 'types/auth'

export enum Types {
  SET_ROLES = 'roles/setRoles',
  SET_PAGINATION = 'roles/setPagination',
  SET_FILTERS = 'roles/setFilters',
  SET_DATE_FILTERS = 'roles/setDateFilters'
}

export const actions = {
  setRoles: createAction<Types, Role[]>(Types.SET_ROLES),
  setPagination: createAction<Types, RolesPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, SearchFilter>(Types.SET_FILTERS),
  setDateFilters: createAction<Types, DateFilter>(Types.SET_DATE_FILTERS)
}
