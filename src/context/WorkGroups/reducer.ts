import { Action } from 'types/contextReducer'
import { WorkgroupState } from 'types/workgroup'
import { Types } from './constants'

export const reducer = (
  state: WorkgroupState,
  action: Action<Types>
): WorkgroupState => {
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
    case Types.SET_WORKGROUP_FILTERS:
      return {
        ...state,
        searchFilter: { ...state.searchFilter, ...action.payload.search },
        dateFilter: { ...state.dateFilter, ...action.payload.date },
        staticFilter: { ...state.staticFilter, ...action.payload.static }
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
