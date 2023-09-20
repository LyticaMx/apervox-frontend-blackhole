import { useContext } from 'react'
import { ContextType } from './types'
import { UserAuditContext } from './context'

export const useSpecificUserAudits = (): ContextType =>
  useContext(UserAuditContext)
