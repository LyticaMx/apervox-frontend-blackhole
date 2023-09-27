import { useContext } from 'react'
import { ContextType } from './types'
import { CommentsContext } from './context'

export const useCommentsContext = (): ContextType =>
  useContext<ContextType>(CommentsContext)
