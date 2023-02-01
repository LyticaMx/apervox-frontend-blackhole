import { AlertContextState } from 'types/alert'
import { Action } from 'types/contextReducer'
import { Types } from './constants'
import { initialState } from './context'

export const reducer = (
  state: AlertContextState,
  action: Action<Types>
): AlertContextState => {
  switch (action.type) {
    case Types.SET_ALERTS:
      return { ...state, listOfAlerts: action.payload }
    case Types.SET_ALERTS_PAGINATION:
      return {
        ...state,
        alertsPagination: {
          ...state.alertsPagination,
          ...action.payload
        }
      }
    case Types.SET_CALL_ALERTS:
      return { ...state, listOfCallsAlerts: action.payload }
    case Types.SET_CALL_ALERTS_PAGINATION:
      return {
        ...state,
        callsPagination: {
          ...state.callsPagination,
          ...action.payload
        }
      }
    case Types.SET_ALERT_TIME_SERIES:
      return { ...state, charts: action.payload }
    case Types.SET_CURRENT_ALERT:
      return {
        ...state,
        currentAlert: action.payload,
        listOfCallsAlerts: initialState.listOfCallsAlerts,
        callsPagination: initialState.callsPagination
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
