import { Filters, createAction } from 'types/contextReducer'
import {
  OverflowLine,
  OverflowLineStaticFilter,
  OverflowLinePaginaton
} from 'types/overflowLine'

export enum Types {
  SET_OVERFLOW_LINES = 'overflowLines/setOverflowLines',
  SET_OVERFLOW_LINES_PAGINATION = 'overflowLines/setOverflowLinesPagination',
  SET_OVERFLOW_LINES_FILTERS = 'overflowLines/setOverflowLinesFilters'
}

export const actions = {
  setOverflowLines: createAction<
    Types,
    {
      data: OverflowLine[]
      total?: number
    }
  >(Types.SET_OVERFLOW_LINES),
  setOverflowLinePagination: createAction<Types, OverflowLinePaginaton>(
    Types.SET_OVERFLOW_LINES_PAGINATION
  ),
  setOverflowLineFilters: createAction<
    Types,
    Filters<OverflowLineStaticFilter>
  >(Types.SET_OVERFLOW_LINES_FILTERS)
}
