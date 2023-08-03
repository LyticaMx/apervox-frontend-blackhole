import { Action } from 'types/contextReducer'
import { Types } from './constants'
import { LiveCallState } from './types'

export const reducer = (
  state: LiveCallState,
  action: Action<Types>
): LiveCallState => {
  switch (action.type) {
    case Types.SET_DATA:
      return { ...state, data: action.payload }
    case Types.SET_TOTAL:
      return { ...state, total: action.payload }
    case Types.SET_FILTERS:
      return {
        ...state,
        dateFilter: { ...state.dateFilter, ...action.payload.date },
        searchFilter: { ...state.searchFilter, ...action.payload.search },
        staticFilter: {
          /* ...state.staticFilter, */ ...action.payload.static
        }
      }
    case Types.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      }
    case Types.SET_COUNTERS:
      return {
        ...state,
        counters: { ...state.counters, ...action.payload }
      }
    default:
      return state
  }
}
