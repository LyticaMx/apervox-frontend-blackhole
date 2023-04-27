import { useContext } from 'react'
import { LabelsContext } from './context'
import { ContextType } from './types'

export const useLabels = (): ContextType => useContext(LabelsContext)
