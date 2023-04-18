import { Context, createContext } from 'react'
import { Action } from 'types/contextReducer'
import { State, ContextType } from './types'
import { Types } from './constants'

export const initialState: State = {
  techniques: []
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Types.GET_TECHNIQUES:
      return { ...state, techniques: action.payload }
    default:
      return state
  }
}

export const TechniquesContext: Context<ContextType> =
  createContext(initialState)
