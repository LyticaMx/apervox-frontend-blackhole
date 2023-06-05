import { State } from 'types/verificationLine'
import { Types } from './constants'
import { Action } from 'types/contextReducer'

export const reducer = (
  state: State,
  action: Action<Types>
): State => {
  switch (action.type) {
    case Types.SET_VERIFICATION_LINES:
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total
      }
    case Types.SET_VERIFICATION_LINES_FILTERS:
      return {
        ...state,
        dateFilter: { ...state.dateFilter, ...action.payload.date },
        searchFilter: { ...state.searchFilter, ...action.payload.search }
      }
    case Types.SET_VERIFICATION_LINES_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      }
    default:
      return state
  }
}
