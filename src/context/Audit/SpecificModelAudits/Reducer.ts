import { Action } from 'types/contextReducer'
import { Types } from './constants'
import { ModelAuditContextState } from './types'

export const reducer = (
  state: ModelAuditContextState,
  action: Action<Types>
): ModelAuditContextState => {
  switch (action.type) {
    case Types.SET_MODEL_ID:
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
