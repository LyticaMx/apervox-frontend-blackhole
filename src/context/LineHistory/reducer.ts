import { Action } from 'types/contextReducer'
import { Types } from './constants'
import { LineHistoryContextState } from './types'

export const reducer = (
  state: LineHistoryContextState,
  action: Action<Types>
): LineHistoryContextState => {
  switch (action.type) {
    case Types.SET_LINE_ID:
      return { ...state, id: action.payload }
    case Types.SET_DATA:
      return { ...state, data: action.payload }
    case Types.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      }
    case Types.SET_FILTERS:
      return { ...state, staticFilter: { ...action.payload.static } }
    default:
      return state
  }
}
