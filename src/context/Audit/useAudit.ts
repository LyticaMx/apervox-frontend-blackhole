import { useContext } from 'react'
import { AuditContextType } from 'types/audit'
import { AuditContext } from './context'

export const useAudit = (): AuditContextType => useContext(AuditContext)
