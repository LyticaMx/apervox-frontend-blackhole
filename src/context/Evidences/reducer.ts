import { Action } from 'types/contextReducer'
import { EvidenceState } from './types'
import { Types } from './constants'

export const reducer = (
  state: EvidenceState,
  action: Action<Types>
): EvidenceState => {
  switch (action.type) {
    case Types.SET_DATA:
      return { ...state, data: action.payload }
    case Types.SET_TOTAL:
      return { ...state, total: action.payload }
    case Types.SET_FILTERS:
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
        staticFilter: { ...action.payload.static }
      }
    case Types.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      }
    case Types.UPDATE_ONE:
      return {
        ...state,
        data: state.data.map((ev) =>
          ev.id === action.payload.id ? action.payload : ev
        )
      }

    default:
      return state
  }
}
