import { OverflowLineContextState } from 'types/overflowLine'
import { Types } from './constants'
import { Action } from 'types/contextReducer'

export const reducer = (
  state: OverflowLineContextState,
  action: Action<Types>
): OverflowLineContextState => {
  switch (action.type) {
    case Types.SET_OVERFLOW_LINES:
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total
      }
    case Types.SET_OVERFLOW_LINES_FILTERS:
      return {
        ...state,
        dateFilter: { ...state.dateFilter, ...action.payload.date },
        searchFilter: { ...state.searchFilter, ...action.payload.search },
        /* TODO: Descomentar cuando los filtros sean OR y no AND */
        staticFilter: { /* ...state.staticFilter, */ ...action.payload.static }
      }
    case Types.SET_OVERFLOW_LINES_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      }

    default:
      return state
  }
}
