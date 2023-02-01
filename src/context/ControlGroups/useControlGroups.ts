import { useContext } from 'react'
import { ContextType } from 'types/control'
import { ControlGroupsContext } from './context'

export const useControlGroups = (): ContextType =>
  useContext(ControlGroupsContext)
