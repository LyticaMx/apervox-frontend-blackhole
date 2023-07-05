import { Context, createContext } from 'react'
import { Action } from 'types/contextReducer'
import { State, ContextType } from './types'
import { Types } from './constants'

export const initialState: State = {
  summary: '',
  techniqueId: '',
  searchFilter: {},
  dateFilter: {}
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Types.SET_TECHNIQUE:
      return {
        ...state,
        technique: action.payload,
        techniqueId: action.payload.id
      }
    case Types.SET_TARGET:
      return { ...state, target: action.payload }
    case Types.SET_SUMMARY:
      return { ...state, summary: action.payload }
    default:
      return state
  }
}

export const TechniqueContext: Context<ContextType> =
  createContext(initialState)
