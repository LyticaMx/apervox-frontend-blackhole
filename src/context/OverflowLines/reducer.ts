import { State } from 'types/overflowLine'
import { Types } from './constants'
import { Action } from 'types/contextReducer'

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.SET_DATA:
      return {
        ...state,
        data: action.payload
      }
    case Types.SET_FILTERS:
      return {
        ...state,
        dateFilter: { ...state.dateFilter, ...action.payload.date },
        searchFilter: { ...state.searchFilter, ...action.payload.search },
        /* TODO: Descomentar cuando los filtros sean OR y no AND */
        staticFilter: { /* ...state.staticFilter, */ ...action.payload.static }
      }
    case Types.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      }
    case Types.SET_TOTALS:
      return {
        ...state,
        totals: { ...state.totals, ...action.payload }
      }

    default:
      return state
  }
}
