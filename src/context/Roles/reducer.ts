import { Action } from 'types/contextReducer'
import { State } from './types'
import { Types } from './constants'

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.SET_ROLES:
      return { ...state, roles: action.payload }
    case Types.SET_DATE_FILTERS:
      return {
        ...state,
        dateFilter: { ...state.dateFilter, ...action.payload }
      }
    case Types.SET_FILTERS:
      return {
        ...state,
        searchFilter: { ...state.searchFilter, ...action.payload }
      }
    case Types.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      }
    default:
      return state
  }
}
