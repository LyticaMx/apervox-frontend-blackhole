import { Filters, createAction } from 'types/contextReducer'
import { PaginationSortFilter } from 'types/filters'
import { OverflowLine, StaticFilter, TotalsLines } from 'types/overflowLine'

export enum Types {
  SET_DATA = 'overflowLines/setOverflowLines',
  SET_PAGINATION = 'overflowLines/setOverflowLinesPagination',
  SET_FILTERS = 'overflowLines/setOverflowLinesFilters',
  SET_TOTALS = 'overflowLines/setTotals'
}

export const actions = {
  setData: createAction<Types, OverflowLine[]>(Types.SET_DATA),
  setPagination: createAction<Types, PaginationSortFilter>(
    Types.SET_PAGINATION
  ),
  setFilters: createAction<Types, Filters<StaticFilter>>(Types.SET_FILTERS),
  setTotals: createAction<Types, TotalsLines>(Types.SET_TOTALS)
}
