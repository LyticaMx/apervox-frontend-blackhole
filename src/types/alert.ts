import { SortingState } from '@tanstack/react-table'
import { PaginationParams } from './api'
import { DateFilter, PaginationFilter } from './filters'
import { TimeChartValues } from './statistics'

export interface Alert {
  id: string
  category: string
  condition: string
  incidences: number
  active: boolean
}

export interface CallAlert {
  id?: string
  hour: string
  pin: string
  receiver: string
  duration: string
}

export interface CallAlertSearchParams extends PaginationParams {
  sort?: SortingState
}

export interface AlertsPagination extends PaginationFilter {
  totalRecords: number
}

export interface CallsPagination extends PaginationFilter {
  totalRecords: number
  sort: SortingState
}

export interface AlertContextState {
  listOfAlerts: Alert[]
  alertsPagination: AlertsPagination
  listOfCallsAlerts: CallAlert[]
  callsPagination: CallsPagination
  charts: TimeChartValues[]
  currentAlert: Alert
  globalFilter: DateFilter
}

export interface AlertContextActions {
  getAlerts: (params?: PaginationParams) => Promise<void>
  getCallAlerts: (params?: CallAlertSearchParams & DateFilter) => Promise<void>
  getStatistics: (params?: DateFilter) => Promise<boolean>
  createAlert: (
    category: string,
    condition: string,
    value: string
  ) => Promise<boolean>
  updateAlert: (id: string, active: boolean) => Promise<boolean>
  deleteAlert: (id: string) => Promise<boolean>
  setCurrentAlert: (alert: Alert) => void
  setGlobalFilters: (params?: DateFilter) => Promise<void>
}

export interface AlertContextType extends AlertContextState {
  actions?: AlertContextActions
}
