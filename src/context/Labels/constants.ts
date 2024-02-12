import { createAction, Filters } from 'types/contextReducer'
import { Label } from 'types/label'
import { LabelsPagination, StaticFilters } from './types'

export enum Types {
  SET_DATA = 'labels/setData',
  SET_PAGINATION = 'labels/setPagination',
  SET_FILTERS = 'labels/setFilters'
}

export const actions = {
  setData: createAction<Types, Label[]>(Types.SET_DATA),
  setPagination: createAction<Types, LabelsPagination>(Types.SET_PAGINATION),
  setFilters: createAction<Types, Filters<StaticFilters>>(Types.SET_FILTERS)
}
