import { useContext } from 'react'
import { ContextType } from './types'
import { TechniquesContext } from './context'

export const useTechniques = (): ContextType => useContext(TechniquesContext)
