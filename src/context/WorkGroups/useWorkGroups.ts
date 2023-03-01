import { useContext } from 'react'
import { ContextType } from 'types/workgroup'
import { WorkGroupsContext } from './context'

export const useWorkGroups = (): ContextType => useContext(WorkGroupsContext)
