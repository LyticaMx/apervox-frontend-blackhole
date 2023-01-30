import { createAction } from 'types/contextReducer'
import {
  Alert,
  AlertsPagination,
  CallAlert,
  CallsPagination
} from 'types/alert'
import { TimeChartValues } from 'types/statistics'
import { DateFilter } from 'types/filters'

export enum Types {
  SET_ALERTS = 'alerts/setAlerts',
  SET_ALERTS_PAGINATION = 'alerts/setAlertsPagination',
  SET_CALL_ALERTS = 'alerts/setCallAlerts',
  SET_CALL_ALERTS_PAGINATION = 'alerts/setCallAlertsPagination',
  SET_ALERT_TIME_SERIES = 'alerts/setAlertTimeSeries',
  SET_CURRENT_ALERT = 'alerts/setCurrentAlert',
  SET_GLOBAL_FILTERS = 'alerts/setGlobalFilters'
}

export const actions = {
  setAlerts: createAction<Types, Alert[]>(Types.SET_ALERTS),
  setAlertsPagination: createAction<Types, AlertsPagination>(
    Types.SET_ALERTS_PAGINATION
  ),
  setCallAlerts: createAction<Types, CallAlert[]>(Types.SET_CALL_ALERTS),
  setCallAlertsPagination: createAction<Types, CallsPagination>(
    Types.SET_CALL_ALERTS_PAGINATION
  ),
  setAlertTimeSeries: createAction<Types, TimeChartValues[]>(
    Types.SET_ALERT_TIME_SERIES
  ),
  setCurrentAlert: createAction<Types, Alert>(Types.SET_CURRENT_ALERT),
  setGlobalFilters: createAction<Types, DateFilter>(Types.SET_GLOBAL_FILTERS)
}
