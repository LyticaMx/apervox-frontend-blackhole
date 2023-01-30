import { subHours } from 'date-fns'
import { Context, createContext } from 'react'
import { Action } from 'types/contextReducer'
import { State, ContextType } from 'types/datesFilter'
import { Types } from './constants'

export const initialState: State = {
  message: '',
  dates: {
    start_time: subHours(new Date(), 72)
  },
  form: {
    start_time: subHours(new Date(), 72)
  }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Types.SET_DATES:
      return { ...state, dates: action.payload }
    case Types.SET_FORM:
      return { ...state, form: action.payload }
    case Types.SET_MESSAGE:
      return { ...state, message: action.payload }
    default:
      return state
  }
}

export const DatesFilterContext: Context<ContextType> =
  createContext(initialState)
