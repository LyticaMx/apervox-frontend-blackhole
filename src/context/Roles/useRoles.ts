import { useContext } from 'react'
import { RoleContext } from './context'
import { ContextType } from './types'

export const useRoles = (): ContextType => useContext(RoleContext)
