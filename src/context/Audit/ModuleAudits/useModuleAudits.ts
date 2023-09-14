import { useContext } from 'react'
import { ContextType } from './types'
import { ModuleAuditsContext } from './context'

export const useModuleAudits = (): ContextType =>
  useContext(ModuleAuditsContext)
