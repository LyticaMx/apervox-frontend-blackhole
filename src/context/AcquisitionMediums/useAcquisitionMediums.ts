import { useContext } from 'react'
import { AcquisitionMediumsContext } from './context'
import { ContextType } from './types'

export const useAcquisitionMediums = (): ContextType =>
  useContext(AcquisitionMediumsContext)
