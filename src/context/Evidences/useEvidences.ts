import { useContext } from 'react'
import { EvidencesContext } from './context'
import { ContextType } from './types'

export const useEvidences = (): ContextType => useContext(EvidencesContext)
