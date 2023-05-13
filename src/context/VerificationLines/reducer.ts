import { VerificationLineContextState } from 'types/verificationLine'
import { Types } from './constants'
import { Action } from 'types/contextReducer'

export const reducer = (
  state: VerificationLineContextState,
  action: Action<Types>
): VerificationLineContextState => {
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
