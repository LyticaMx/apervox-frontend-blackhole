import { Action } from 'types/contextReducer'
import { UserContextState } from 'types/user'
import { Types } from './constants'

export const reducer = (
  state: UserContextState,
  action: Action<Types>
): UserContextState => {
  switch (action.type) {
    case Types.SET_USERS:
      return { ...state, listOfUsers: action.payload }
    case Types.SET_USERS_FILTERS:
      return {
        ...state,
        dateFilter: { ...state.dateFilter, ...action.payload.date },
        searchFilter: { ...state.searchFilter, ...action.payload.search },
        /* TODO: Descomentar cuando los filtros sean OR y no AND */
        staticFilter: { /* ...state.staticFilter, */ ...action.payload.static }
      }
    case Types.SET_USERS_PAGINATION:
      return {
        ...state,
        usersPagination: { ...state.usersPagination, ...action.payload }
      }

    default:
      return state
  }
}
