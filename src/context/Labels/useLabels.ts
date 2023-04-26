import { useContext } from 'react'
import { LabelsContext } from './context'
import { ContextType } from './types'

export const useRoles = (): ContextType => useContext(LabelsContext)
