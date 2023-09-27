import mutexify from 'mutexify/promise'
import { actions } from './constants'
import { Actions, Comment, State } from './types'

const lock = mutexify()

export const useActions = (state: State, dispatch): Actions => {
  const { comments: data, pagination } = state
  const addComments = async (
    comments: Comment[],
    page: number
  ): Promise<void> => {
    const release = await lock()
    try {
      dispatch(actions.setData([...data, ...comments]))
      dispatch(
        actions.setPagination({
          ...pagination,
          page,
          hasNextPage: comments.length > 0
        })
      )
    } finally {
      release()
    }
  }

  const createComment = async (comment: Comment): Promise<void> => {
    const release = await lock()
    try {
      dispatch(actions.setData([comment, ...data]))
    } finally {
      release()
    }
  }

  const updateComment = async (comment: Comment): Promise<void> => {
    const release = await lock()
    try {
      const indexToUpdate = data.findIndex((el) => el.id === comment.id)
      if (indexToUpdate < 0) return
      const newComments = [...data]
      newComments[indexToUpdate] = comment
      dispatch(actions.setData(newComments))
    } catch {
    } finally {
      release()
    }
  }

  const resetComments = async (): Promise<void> => {
    const release = await lock()
    try {
      dispatch(actions.setData([]))
      dispatch(
        actions.setPagination({ page: 1, limit: 20, hasNextPage: false })
      )
    } finally {
      release()
    }
  }

  return {
    addComments,
    createComment,
    updateComment,
    resetComments
  }
}
