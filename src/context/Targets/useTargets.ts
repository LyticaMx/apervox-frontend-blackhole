import { useContext } from 'react'
import { TargetsContext } from './context'
import { ContextType } from 'types/target'

export const useTargets = (): ContextType => useContext(TargetsContext)
