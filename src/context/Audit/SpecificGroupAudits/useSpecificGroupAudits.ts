import { useContext } from 'react'
import { ContextType } from './types'
import { GroupAuditContext } from './context'

export const useSpecificGroupAudits = (): ContextType =>
  useContext(GroupAuditContext)
