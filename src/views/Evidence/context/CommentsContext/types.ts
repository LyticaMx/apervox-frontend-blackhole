import { PaginationFilter } from 'types/filters'

export interface Comment {
  id: string
  data: string
  author: string
  authorId: string
  createdAt: string
  evidenceId: string
  evidenceNumber: string
  targetPhone: string
}

export interface CommentsPagination extends PaginationFilter {
  hasNextPage: boolean
}

export interface State {
  comments: Comment[]
  pagination: CommentsPagination
}

export interface Actions {
  addComments: (comments: Comment[], page: number) => Promise<void>
  createComment: (comment: Comment) => Promise<void>
  updateComment: (comment: Comment) => Promise<void>
  resetComments: () => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
