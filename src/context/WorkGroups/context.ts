import { Context, createContext } from 'react'
import { Action } from 'types/contextReducer'
import { ContextType, State } from 'types/workgroup'
import { Status } from 'types/status'
import { Types } from './constants'

export const initialState: State = {
  selected: {
    id: '',
    name: '',
    description: '',
    registered_by: '',
    total_users: 0,
    created_at: '',
    updated_at: '',
    techniques: {
      assigned: 0,
      current: 0,
      to_conclude: 0,
      concluded: 0
    },
    status: Status.ACTIVE
  },
  workGroups: [],
  history: [],
  users: [],
  techniques: [],
  associatedUsers: [],
  associatedTechniques: [],
  workGroupsPagination: {
    page: 1,
    limit: 10,
    totalRecords: 0
  },
  usersPagination: {
    page: 1,
    limit: 10,
    totalRecords: 0
  },
  techniquesPagination: {
    page: 1,
    limit: 10,
    totalRecords: 0
  }
}

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.SET_USERS:
      return { ...state, users: action.payload }
    case Types.SET_TECHNIQUES:
      return { ...state, techniques: action.payload }
    case Types.SET_HISTORY:
      return { ...state, history: action.payload }
    case Types.SET_WORKGROUPS:
      return { ...state, workGroups: action.payload }
    case Types.SET_WORKGROUP_USERS:
      return { ...state, associatedUsers: action.payload }
    case Types.SET_WORKGROUP_TECHNIQUES:
      return { ...state, associatedTechniques: action.payload }
    case Types.SET_SELECTED_WORKGROUP:
      return { ...state, selected: action.payload }
    case Types.SET_WORKGROUP_PAGINATION:
      return {
        ...state,
        workGroupsPagination: {
          ...state.workGroupsPagination,
          ...action.payload
        }
      }
    case Types.SET_WORKGROUP_USERS_PAGINATION:
      return {
        ...state,
        usersPagination: {
          ...state.usersPagination,
          ...action.payload
        }
      }
    case Types.SET_WORKGROUP_TECHNIQUES_PAGINATION:
      return {
        ...state,
        techniquesPagination: {
          ...state.techniquesPagination,
          ...action.payload
        }
      }
    default:
      return state
  }
}

export const WorkGroupsContext: Context<ContextType> =
  createContext(initialState)
