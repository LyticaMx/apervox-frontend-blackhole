import { subHours } from 'date-fns'
import { Context, createContext } from 'react'
import { AuditContextType } from 'types/audit'

export const initialState: AuditContextType = {
  listOfAudits: [],
  auditPagination: {
    limit: 10,
    page: 1,
    totalRecords: 0
  },
  globalFilter: {
    start_time: subHours(new Date(), 72)
  }
}
export const AuditContext: Context<AuditContextType> =
  createContext(initialState)
