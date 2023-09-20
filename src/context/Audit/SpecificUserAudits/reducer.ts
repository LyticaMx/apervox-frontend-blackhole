import { Action } from 'types/contextReducer'
import { Types } from './constants'
import { UserAuditContextState } from './types'

export const reducer = (
  state: UserAuditContextState,
  action: Action<Types>
): UserAuditContextState => {
  switch (action.type) {
    case Types.SET_USER_ID:
      return { ...state, id: action.payload }
    case Types.SET_DATA:
      return { ...state, data: action.payload }
    case Types.SET_TOTAL:
      return { ...state, total: action.payload }
    case Types.SET_FILTERS:
      return {
        ...state,
        dateFilter: { ...state.dateFilter, ...action.payload.date },
        searchFilter: { ...state.searchFilter, ...action.payload.search }
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
