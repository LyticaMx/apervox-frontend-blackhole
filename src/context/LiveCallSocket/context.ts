import { Context, createContext } from 'react'
import { ContextState } from './types'

export const LiveCallSocketContext: Context<ContextState> =
  createContext<ContextState>({
    data: [],
    socket: null
  })
