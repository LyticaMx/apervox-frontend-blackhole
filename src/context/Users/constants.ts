import { createAction } from 'types/contextReducer'
import { DateFilter, SearchFilter } from 'types/filters'
import { User, UsersPagination } from 'types/user'

export enum Types {
  SET_USERS = 'users/setUsers',
  SET_USERS_PAGINATION = 'users/setUsersPagination',
  SET_USERS_FILTERS = 'users/setUsersFilters',
  SET_DATE_FILTERS = 'users/setDateFilters'
}

export const actions = {
  setUsers: createAction<Types, User[]>(Types.SET_USERS),
  setUsersPagination: createAction<Types, UsersPagination>(
    Types.SET_USERS_PAGINATION
  ),
  setUsersFilters: createAction<Types, SearchFilter>(Types.SET_USERS_FILTERS),
  setDateFilters: createAction<Types, DateFilter>(Types.SET_DATE_FILTERS)
}
