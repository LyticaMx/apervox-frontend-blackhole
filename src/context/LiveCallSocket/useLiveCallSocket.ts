import { useContext } from 'react'
import { LiveCallSocketContext } from './context'
import { ContextState } from './types'

export const useLiveCallSocket = (): ContextState =>
  useContext(LiveCallSocketContext)
