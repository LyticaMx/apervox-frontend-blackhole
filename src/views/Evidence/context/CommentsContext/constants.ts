import { createAction } from 'types/contextReducer'
import { Comment, CommentsPagination } from './types'

export enum Types {
  SET_DATA = 'comments/setData',
  SET_PAGINATION = 'comments/setPagination'
}

export const actions = {
  setData: createAction<Types, Comment[]>(Types.SET_DATA),
  setPagination: createAction<Types, CommentsPagination>(Types.SET_PAGINATION)
}
