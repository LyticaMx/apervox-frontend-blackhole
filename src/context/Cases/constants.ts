import {
  Summary,
  Case,
  CasesPagination,
  FrequentNumber,
  Call,
  CallsPagination
} from 'types/case'
import { DateFilter } from 'types/filters'
import { createAction } from 'types/contextReducer'

export enum Types {
  SET_SUMMARY = 'cases/setSummary',
  SET_ACTIVE_CASES = 'cases/setActiveCases',
  SET_ACTIVE_CASES_PAGINATION = 'cases/setActiveCasesPagination',
  SET_ARCHIVED_CASES = 'cases/setArchivedCases',
  SET_ARCHIVED_CASES_PAGINATION = 'cases/setArchivedCasesPagination',
  SET_CURRENT_CASE = 'cases/setCurrentCase',
  UPDATE_CURRENT_CASE = 'cases/updateCurrentCase',
  SET_FREQUENT_NUMBERS = 'cases/setFrequentNumbers',
  SET_CASE_CALLS = 'cases/setCaseCalls',
  SET_CASE_CALLS_PAGINATION = 'cases/setCaseCallsPagination',
  SET_GLOBAL_FILTERS = 'cases/setGlobalFilters'
}

export const actions = {
  setSummary: createAction<Types, Summary>(Types.SET_SUMMARY),
  setActiveCases: createAction<Types, Case[]>(Types.SET_ACTIVE_CASES),
  setActiveCasesPagination: createAction<Types, CasesPagination>(
    Types.SET_ACTIVE_CASES_PAGINATION
  ),
  setArchivedCases: createAction<Types, Case[]>(Types.SET_ARCHIVED_CASES),
  setArchivedCasesPagination: createAction<Types, CasesPagination>(
    Types.SET_ARCHIVED_CASES_PAGINATION
  ),
  setCurrentCase: createAction<Types, Case>(Types.SET_CURRENT_CASE),
  updateCurrentCase: createAction<Types, Case>(Types.UPDATE_CURRENT_CASE),
  setFrequentNumbers: createAction<Types, FrequentNumber[]>(
    Types.SET_FREQUENT_NUMBERS
  ),
  setCaseCalls: createAction<Types, Call[]>(Types.SET_CASE_CALLS),
  setCaseCallsPagination: createAction<Types, CallsPagination>(
    Types.SET_CASE_CALLS_PAGINATION
  ),
  setGlobalFilters: createAction<Types, DateFilter>(Types.SET_GLOBAL_FILTERS)
}
