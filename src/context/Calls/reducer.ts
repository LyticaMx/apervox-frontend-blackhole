import { CallContextState } from 'types/call'
import { Action } from 'types/contextReducer'
import { Types } from './constants'

export const reducer = (
  state: CallContextState,
  action: Action<Types>
): CallContextState => {
  switch (action.type) {
    case Types.SET_CALLS:
      return {
        ...state,
        listOfCalls: action.payload
      }
    case Types.SET_CALLS_PAGINATION:
      return {
        ...state,
        callsPagination: {
          ...state.callsPagination,
          ...action.payload
        }
      }
    case Types.SET_PINS:
      return {
        ...state,
        pinActivityList: action.payload
      }
    case Types.SET_PINS_PAGINATION:
      return {
        ...state,
        pinsPagination: { ...state.pinsPagination, ...action.payload }
      }
    case Types.SET_CALL_COUNTS:
      return {
        ...state,
        counts: action.payload
      }
    case Types.SET_CALL_CHARTS:
      return {
        ...state,
        charts: action.payload
      }
    case Types.SET_GLOBAL_FILTERS:
      return {
        ...state,
        globalFilter: {
          ...state.globalFilter,
          ...action.payload
        }
      }
    default:
      return state
  }
}
