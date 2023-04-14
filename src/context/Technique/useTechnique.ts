import { useContext } from 'react'
import { ContextType } from './types'
import { TechniqueContext } from './context'

export const useTechnique = (): ContextType => useContext(TechniqueContext)
