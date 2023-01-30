import { subHours } from 'date-fns'
import { Context, createContext } from 'react'
import { Action } from 'types/contextReducer'
import { State, ContextType } from 'types/control'
import { Types } from './constants'

export const initialState: State = {
  controlGroup: undefined,
  controlGroups: [],
  audios: [],
  calls: [],
  groupsPagination: {
    page: 1,
    limit: 10,
    totalRecords: 0,
    orderBy: 'date'
  },
  callsPagination: {
    page: 1,
    limit: 10,
    totalRecords: 0,
    orderBy: 'PIN',
    otherPin: false
  },
  dates: {
    start_time: subHours(new Date(), 72)
  }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Types.SET_CONTROL_GROUPS:
      return { ...state, controlGroups: action.payload }
    case Types.SET_CONTROL_GROUP:
      return { ...state, controlGroup: action.payload }
    case Types.SET_AUDIOS:
      return { ...state, audios: action.payload }
    case Types.SET_CALLS:
      return { ...state, calls: action.payload }
    case Types.SET_DATES:
      return { ...state, dates: action.payload }
    case Types.SET_GROUPS_PAGINATION:
      return {
        ...state,
        groupsPagination: {
          ...state.groupsPagination,
          ...action.payload
        }
      }
    case Types.SET_CALLS_PAGINATION:
      return {
        ...state,
        callsPagination: {
          ...state.callsPagination,
          ...action.payload
        }
      }
    default:
      return state
  }
}

export const ControlGroupsContext: Context<ContextType> =
  createContext(initialState)
