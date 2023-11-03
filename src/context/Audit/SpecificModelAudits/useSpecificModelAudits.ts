import { useContext } from 'react'
import { ContextType } from './types'
import { ModelAuditContext } from './context'

export const useSpecificModelAudits = (): ContextType =>
  useContext(ModelAuditContext)
