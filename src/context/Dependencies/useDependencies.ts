import { useContext } from 'react'
import { ContextType } from 'types/dependency'
import { DependenciesContext } from './context'

export const useDependencies = (): ContextType =>
  useContext(DependenciesContext)
