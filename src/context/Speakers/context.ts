import { subHours } from 'date-fns'
import { Context, createContext } from 'react'
import { Action } from 'types/contextReducer'
import { ContextType, State } from 'types/speaker'
import { Types } from './constants'

export const initialState: State = {
  summary: {
    totalPins: { current: 0, last: 0, change: 0 },
    pinAlerts: { current: 0, last: 0, change: 0 },
    average: { current: 0, last: 0, change: 0 }
  },
  histogram: [],
  pins: [],
  heatmapSpeakers: [],
  heatmapAlerts: [],
  calls: [],
  pinsPagination: {
    page: 1,
    limit: 5,
    totalRecords: 0,
    min_value: 0,
    max_value: 0
  },
  callsPagination: {
    page: 1,
    limit: 10,
    totalRecords: 0,
    order_by: 'CREATED_AT',
    calls: 'SPEAKER'
  },
  dates: {
    start_time: subHours(new Date(), 72)
  }
}

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.SET_SUMMARY:
      return { ...state, summary: action.payload }
    case Types.SET_HISTOGRAM:
      return { ...state, histogram: action.payload }
    case Types.SET_PINS:
      return { ...state, pins: action.payload }
    case Types.SET_HEATMAP_SPEAKERS:
      return { ...state, heatmapSpeakers: action.payload }
    case Types.SET_HEATMAP_ALERTS:
      return { ...state, heatmapAlerts: action.payload }
    case Types.SET_CALLS:
      return { ...state, calls: action.payload }
    case Types.SET_DATES:
      return { ...state, dates: action.payload }
    case Types.SET_PINS_PAGINATION:
      return {
        ...state,
        pinsPagination: {
          ...state.pinsPagination,
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

export const SpeakersContext: Context<ContextType> = createContext(initialState)
