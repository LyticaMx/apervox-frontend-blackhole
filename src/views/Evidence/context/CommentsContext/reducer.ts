import { Action } from 'types/contextReducer'
import { Types } from './constants'
import { State } from './types'

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.SET_DATA:
      return { ...state, comments: action.payload }
    case Types.SET_PAGINATION:
      return { ...state, pagination: action.payload }
    default:
      return state
  }
}
