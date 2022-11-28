import { useContext } from 'react'
import { RolesContextType } from 'types/roles'
import { RolesContext } from './context'

export const useRoles = (): RolesContextType => useContext(RolesContext)
