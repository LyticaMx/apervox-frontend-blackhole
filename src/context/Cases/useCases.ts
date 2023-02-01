import { useContext } from 'react'
import { CaseContextType } from 'types/case'
import { CasesContext } from './context'

export const useCases = (): CaseContextType => useContext(CasesContext)
