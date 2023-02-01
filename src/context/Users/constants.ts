import { createAction } from 'types/contextReducer'
import { Dependency } from 'types/dependency'
import { Pagination, User, UserRequest, UsersSummary } from 'types/user'

export enum Types {
  SET_DEPENDENCIES = 'users/setDependencies',
  SET_SUMMARY = 'users/setSummary',
  SET_USERS = 'users/setUsers',
  SET_REQUESTS = 'users/setRequests',
  SET_USERS_PAGINATION = 'users/setUsersPagination',
  SET_REQUESTS_PAGINATION = 'users/setRequestsPagination'
}
export const actions = {
  setDependencies: createAction<Types, Dependency[]>(Types.SET_DEPENDENCIES),
  setSummary: createAction<Types, UsersSummary>(Types.SET_SUMMARY),
  setUsers: createAction<Types, User[]>(Types.SET_USERS),
  setRequests: createAction<Types, UserRequest[]>(Types.SET_REQUESTS),
  setUsersPagination: createAction<Types, Pagination>(
    Types.SET_USERS_PAGINATION
  ),
  setRequestsPagination: createAction<Types, Pagination>(
    Types.SET_REQUESTS_PAGINATION
  )
}
