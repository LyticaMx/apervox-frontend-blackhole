import { subHours } from 'date-fns'
import { Context, createContext } from 'react'
import { CaseContextState, CaseContextType } from 'types/case'

export const initialState: CaseContextState = {
  listOfActiveCases: [],
  activeCasesPagination: {
    totalRecords: 0,
    page: 1,
    limit: 10
  },
  listOfArchivedCases: [],
  archivedCasesPagination: {
    totalRecords: 0,
    page: 1,
    limit: 10
  },
  summary: {
    alertsInCases: {
      current: 0,
      last: 0
    },
    pinsInCases: {
      current: 0,
      last: 0
    },
    totalCases: {
      current: 0,
      last: 0
    }
  },
  caseDetail: {
    createdBy: '',
    id: '',
    listOfCalls: [],
    callsPagination: {
      alert: 3, // 3 es todas las llamadas
      sort: [],
      totalRecords: 0,
      page: 1,
      limit: 10
    },
    listOfFrequentNumbers: [],
    name: '',
    pins: [],
    users: []
  },
  globalFilter: {
    start_time: subHours(new Date(), 72)
  }
}

export const CasesContext: Context<CaseContextType> =
  createContext(initialState)
