import { useContext } from 'react'
import { ContextType } from './types'
import { BlockedUserAuditsContext } from './context'

export const useBlockedUserAudits = (): ContextType =>
  useContext(BlockedUserAuditsContext)
