import { AuditContextState } from 'types/audit'
import { Action } from 'types/contextReducer'
import { Types } from './constants'

export const reducer = (
  state: AuditContextState,
  action: Action<Types>
): AuditContextState => {
  switch (action.type) {
    case Types.SET_AUDITS:
      return { ...state, listOfAudits: action.payload }
    case Types.SET_AUDITS_PAGINATION:
      return {
        ...state,
        auditPagination: {
          ...state.auditPagination,
          ...action.payload
        }
      }
    case Types.SET_GLOBAL_FILTERS:
      return {
        ...state,
        globalFilter: {
          ...state.globalFilter,
          ...action.payload
        }
      }
    default:
      return state
  }
}
