import { Context, createContext } from 'react'
import { State } from './types'

export const initialState: State = {
  comments: [],
  pagination: {
    hasNextPage: true,
    limit: 20,
    page: 1
  }
}

export const CommentsContext: Context<State> = createContext(initialState)
