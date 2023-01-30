import { Context, createContext } from 'react'
import { Action } from 'types/contextReducer'
import { ContextType, State } from 'types/dependency'
import { Types } from './constants'

export const initialState: State = {
  users: [],
  dependencies: [],
  dependency: undefined,
  usersPagination: {
    limit: 10,
    page: 1,
    totalRecords: 0
  },
  dependenciesPagination: {
    limit: 10,
    page: 1,
    totalRecords: 0
  }
}

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.SET_DEPENDENCIES:
      return { ...state, dependencies: action.payload }
    case Types.SET_DEPENDENCY:
      return { ...state, dependency: action.payload }
    case Types.SET_USERS:
      return { ...state, users: action.payload }
    case Types.SET_USERS_PAGINATION:
      return {
        ...state,
        usersPagination: {
          ...state.usersPagination,
          ...action.payload
        }
      }
    case Types.SET_DEPENDENCIES_PAGINATION:
      return {
        ...state,
        dependenciesPagination: {
          ...state.dependenciesPagination,
          ...action.payload
        }
      }
    default:
      return state
  }
}

export const DependenciesContext: Context<ContextType> =
  createContext(initialState)
