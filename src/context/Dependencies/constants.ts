import { createAction } from 'types/contextReducer'
import { Dependency } from 'types/dependency'
import { Pagination, User } from 'types/user'

export enum Types {
  SET_DEPENDENCIES = 'users/setDependencies',
  SET_DEPENDENCY = 'users/setDependency',
  SET_USERS = 'users/setUsers',
  SET_USERS_PAGINATION = 'users/setUsersPagination',
  SET_DEPENDENCIES_PAGINATION = 'users/setDependenciesPagination'
}
export const actions = {
  setDependencies: createAction<Types, Dependency[]>(Types.SET_DEPENDENCIES),
  setDependency: createAction<Types, Dependency>(Types.SET_DEPENDENCY),
  setUsers: createAction<Types, User[]>(Types.SET_USERS),
  setUsersPagination: createAction<Types, Pagination>(
    Types.SET_USERS_PAGINATION
  ),
  setDependenciesPagination: createAction<Types, Pagination>(
    Types.SET_DEPENDENCIES_PAGINATION
  )
}
