import { createAction } from 'types/contextReducer'
import { Comment } from './types'
import { PaginationFilter } from 'types/filters'

export enum Types {
  SET_DATA = 'comments/setData',
  SET_PAGINATION = 'comments/setPagination'
}

export const actions = {
  setData: createAction<Types, Comment[]>(Types.SET_DATA),
  setPagination: createAction<Types, PaginationFilter>(Types.SET_PAGINATION)
}
