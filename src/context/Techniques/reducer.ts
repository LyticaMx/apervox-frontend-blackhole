import { Action } from 'types/contextReducer'
import { Types } from './constants'
import { State } from './types'

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.SET_TECHNIQUES:
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total
      }
    case Types.SET_TECHNIQUES_FILTERS:
      return {
        ...state,
        dateFilter: {
          ...state.dateFilter,
          ...action.payload.date
        },
        searchFilter: {
          ...state.searchFilter,
          ...action.payload.search
        },
        /* TODO: Descomentar cuando los filtros sean OR y no AND */
        staticFilter: {
          /* ...state.staticFilter, */
          ...action.payload.static
        }
      }
    case Types.SET_TECHNIQUES_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      }
    default:
      return state
  }
}
