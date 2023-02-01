import { SortingState } from '@tanstack/react-table'
import { PaginationParams } from './api'
import { DatesFilterForm } from './datesFilter'
import { DateFilter, PaginationFilter } from './filters'

export interface User {
  id: string
  fullName: string
  email: string
}

export interface Pin {
  id: string
  number: number
}

export interface Case {
  id: string
  name: string
  users: User[]
  pins: Pin[]
  createdBy: string
}

interface SummaryData {
  current: number
  last: number
}

export interface Summary {
  totalCases: SummaryData
  pinsInCases: SummaryData
  alertsInCases: SummaryData
}

export interface Call {
  id: number
  date: string
  hour: string
  pin: number
  receiver: string
  duration: string
  notification: false
}

export interface FrequentNumber {
  item: string
  score: number
}

export interface CallsParams extends PaginationParams {
  sort?: SortingState
  alert?: number
}

export interface CallsPagination extends PaginationFilter {
  sort: SortingState
  alert: number
  totalRecords: number
}
export interface CaseDetail extends Case {
  listOfCalls: Call[]
  callsPagination: CallsPagination
  listOfFrequentNumbers: FrequentNumber[]
}

export interface CasesPagination extends PaginationFilter {
  totalRecords: number
}
export interface CaseContextState {
  summary: Summary
  listOfActiveCases: Case[]
  activeCasesPagination: CasesPagination
  listOfArchivedCases: Case[]
  archivedCasesPagination: CasesPagination
  caseDetail: CaseDetail
  globalFilter: DateFilter
}

export type CaseState = 'active' | 'archived'
export interface GetAllParams extends DateFilter {
  casesType: CaseState
}

export interface CaseContextActions {
  getActiveCases: (params?: PaginationParams & DateFilter) => Promise<void>
  getArchivedCases: (params?: PaginationParams & DateFilter) => Promise<void>
  getCalls: (params?: CallsParams & DateFilter) => Promise<void>
  getFrequentNumbers: (params?: DateFilter) => Promise<void>
  getSummary: (params?: DateFilter) => Promise<void>
  getAll: (params: GetAllParams) => Promise<boolean>
  setGlobalFilters: (
    casesType: CaseState,
    filters: DatesFilterForm
  ) => Promise<void>
  setCurrentCase: (currentCase: Case) => void
  createCase: (
    name: string,
    users: string[],
    pins: string[]
  ) => Promise<boolean>
  updateCase: (
    caseId: string,
    store: boolean,
    name?: string,
    users?: string[],
    pins?: string[]
  ) => Promise<boolean>
  linkUser: (userId: string, link?: boolean) => Promise<boolean>
  linkPin: (pinId: string, link?: boolean) => Promise<boolean>
}

export interface CaseContextType extends CaseContextState {
  actions?: CaseContextActions
}
