import { Context, createContext } from 'react'
import { Action } from 'types/contextReducer'
import { ContextType, State } from 'types/user'
import { Types } from './constants'

export const initialState: State = {
  dependencies: [],
  summary: {
    total_blocked: 0,
    total_requests: 0,
    total_users: 0
  },
  users: [],
  usersRequests: [],
  usersPagination: {
    page: 1,
    limit: 10,
    totalRecords: 0
  },
  requestsPagination: {
    page: 1,
    limit: 10,
    totalRecords: 0
  }
}

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.SET_DEPENDENCIES:
      return { ...state, dependencies: action.payload }
    case Types.SET_SUMMARY:
      return { ...state, summary: action.payload }
    case Types.SET_USERS:
      return { ...state, users: action.payload }
    case Types.SET_REQUESTS:
      return { ...state, usersRequests: action.payload }
    case Types.SET_USERS_PAGINATION:
      return {
        ...state,
        usersPagination: {
          ...state.usersPagination,
          ...action.payload
        }
      }
    case Types.SET_REQUESTS_PAGINATION:
      return {
        ...state,
        requestsPagination: {
          ...state.requestsPagination,
          ...action.payload
        }
      }
    default:
      return state
  }
}

export const UsersContext: Context<ContextType> = createContext(initialState)
