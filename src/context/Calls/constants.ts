import { createAction } from 'types/contextReducer'
import {
  CallModel,
  CallsPagination,
  PinsPagination,
  SummaryCountVM,
  HistoricalChartVM
} from 'types/call'
import { PinActivity } from 'types/statistics'
import { DateFilter } from 'types/filters'

export enum Types {
  SET_CALLS = 'calls/setCalls',
  SET_CALLS_PAGINATION = 'calls/setCallsPagination',
  SET_PINS = 'calls/setPins',
  SET_PINS_PAGINATION = 'calls/setPinsPagination',
  SET_CALL_COUNTS = 'calls/setCallCounts',
  SET_CALL_CHARTS = 'calls/setCallCharts',
  SET_GLOBAL_FILTERS = 'calls/setGlobalFilters'
}

export const actions = {
  setCalls: createAction<Types, CallModel[]>(Types.SET_CALLS),
  setCallsPagination: createAction<Types, CallsPagination>(
    Types.SET_CALLS_PAGINATION
  ),
  setPins: createAction<Types, PinActivity[]>(Types.SET_PINS),
  setPinsPagination: createAction<Types, PinsPagination>(
    Types.SET_PINS_PAGINATION
  ),
  setCallCounts: createAction<Types, SummaryCountVM>(Types.SET_CALL_COUNTS),
  setCallCharts: createAction<Types, HistoricalChartVM>(Types.SET_CALL_CHARTS),
  setGlobalFilters: createAction<Types, DateFilter>(Types.SET_GLOBAL_FILTERS)
}
