import { Action } from 'types/contextReducer'
import { AuditContextState } from '../types'
import { Types } from './constants'

export const reducer = (
  state: AuditContextState,
  action: Action<Types>
): AuditContextState => {
  switch (action.type) {
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
