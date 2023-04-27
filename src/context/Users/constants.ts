import { createAction, Filters } from 'types/contextReducer'
import { User, UserStaticFilter, UsersPagination } from 'types/user'

export enum Types {
  SET_USERS = 'users/setUsers',
  SET_USERS_PAGINATION = 'users/setUsersPagination',
  SET_USERS_FILTERS = 'users/setUsersFilters'
}

export const actions = {
  setUsers: createAction<
    Types,
    {
      data: User[]
      total?: number
    }
  >(Types.SET_USERS),
  setUsersPagination: createAction<Types, UsersPagination>(
    Types.SET_USERS_PAGINATION
  ),
  setUsersFilters: createAction<Types, Filters<UserStaticFilter>>(
    Types.SET_USERS_FILTERS
  )
}
