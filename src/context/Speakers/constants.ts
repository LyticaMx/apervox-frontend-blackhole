import { createAction } from 'types/contextReducer'
import { DateFilter } from 'types/filters'
import {
  CallByAlerts,
  Heatmap,
  HistogramCall,
  ListPin,
  Summary
} from 'types/speaker'

export enum Types {
  SET_SUMMARY = 'speakers/setSummary',
  SET_HISTOGRAM = 'speakers/setHistogram',
  SET_PINS = 'speakers/setPins',
  SET_HEATMAP_ALERTS = 'speakers/setHeatmapAlerts',
  SET_HEATMAP_SPEAKERS = 'speakers/setHeatmapSpeakers',
  SET_CALLS = 'speakers/setCalls',
  SET_PINS_PAGINATION = 'speakers/setPinsPagination',
  SET_CALLS_PAGINATION = 'speakers/setCallsPagination',
  SET_DATES = 'speakers/setDates'
}
export const actions = {
  setSummary: createAction<Types, Summary>(Types.SET_SUMMARY),
  setHistogram: createAction<Types, HistogramCall[]>(Types.SET_HISTOGRAM),
  setPins: createAction<Types, ListPin>(Types.SET_PINS),
  setHeatmapAlerts: createAction<Types, Heatmap[]>(Types.SET_HEATMAP_ALERTS),
  setHeatmapSpeakers: createAction<Types, Heatmap[]>(
    Types.SET_HEATMAP_SPEAKERS
  ),
  setCalls: createAction<Types, CallByAlerts[]>(Types.SET_CALLS),
  setPinsPagination: createAction<Types>(Types.SET_PINS_PAGINATION),
  setCallsPagination: createAction<Types>(Types.SET_CALLS_PAGINATION),
  setDates: createAction<Types, DateFilter>(Types.SET_DATES)
}
