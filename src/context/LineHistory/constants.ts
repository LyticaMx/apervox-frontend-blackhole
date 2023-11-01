import { Filters, createAction } from 'types/contextReducer'
import {
  LineEvent,
  LineHistoryPagination,
  LineHistoryStaticFilter,
  SelectedLine
} from './types'

export enum Types {
  SET_LINE_ID = 'lineHistory/setLineID',
  SET_DATA = 'lineHistory/setData',
  SET_PAGINATION = 'lineHistory/setPagination',
  SET_FILTERS = 'lineHistory/setFilters'
}

export const actions = {
  setLineID: createAction<Types, SelectedLine | undefined>(Types.SET_LINE_ID),
  setData: createAction<Types, LineEvent[]>(Types.SET_DATA),
  setPagination: createAction<Types, LineHistoryPagination>(
    Types.SET_PAGINATION
  ),
  setFilters: createAction<Types, Filters<LineHistoryStaticFilter>>(
    Types.SET_FILTERS
  )
}
