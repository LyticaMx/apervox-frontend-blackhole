import { Action } from 'types/contextReducer'
import { Types } from './constants'
import { GroupAuditContextState } from './types'

export const reducer = (
  state: GroupAuditContextState,
  action: Action<Types>
): GroupAuditContextState => {
  switch (action.type) {
    case Types.SET_GROUP_ID:
      return { ...state, id: action.payload }
    case Types.SET_DATA:
      return { ...state, data: action.payload }
    case Types.SET_TOTAL:
      return { ...state, total: action.payload }
    case Types.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      }
    case Types.SET_FILTERS:
      return {
        ...state,
        dateFilter: { ...state.dateFilter, ...action.payload.date },
        searchFilter: { ...state.searchFilter, ...action.payload.search }
      }
    default:
      return state
  }
}
