import { CaseContextState } from 'types/case'
import { Action } from 'types/contextReducer'
import { initialState } from './context'
import { Types } from './constants'

export const reducer = (
  state: CaseContextState,
  action: Action<Types>
): CaseContextState => {
  switch (action.type) {
    case Types.SET_ACTIVE_CASES:
      return { ...state, listOfActiveCases: action.payload }
    case Types.SET_ACTIVE_CASES_PAGINATION:
      return {
        ...state,
        activeCasesPagination: {
          ...state.activeCasesPagination,
          ...action.payload
        }
      }
    case Types.SET_ARCHIVED_CASES:
      return { ...state, listOfArchivedCases: action.payload }
    case Types.SET_ARCHIVED_CASES_PAGINATION:
      return {
        ...state,
        archivedCasesPagination: {
          ...state.archivedCasesPagination,
          ...action.payload
        }
      }
    case Types.SET_FREQUENT_NUMBERS:
      return {
        ...state,
        caseDetail: {
          ...state.caseDetail,
          listOfFrequentNumbers: action.payload
        }
      }
    case Types.SET_CURRENT_CASE:
      return {
        ...state,
        caseDetail: {
          listOfCalls: [],
          listOfFrequentNumbers: [],
          callsPagination: initialState.caseDetail.callsPagination,
          ...action.payload
        }
      }
    case Types.UPDATE_CURRENT_CASE:
      return {
        ...state,
        caseDetail: {
          ...state.caseDetail,
          ...action.payload
        }
      }
    case Types.SET_CASE_CALLS:
      return {
        ...state,
        caseDetail: {
          ...state.caseDetail,
          listOfCalls: action.payload
        }
      }
    case Types.SET_CASE_CALLS_PAGINATION:
      return {
        ...state,
        caseDetail: {
          ...state.caseDetail,
          callsPagination: {
            ...state.caseDetail.callsPagination,
            ...action.payload
          }
        }
      }
    case Types.SET_SUMMARY:
      return {
        ...state,
        summary: action.payload
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
