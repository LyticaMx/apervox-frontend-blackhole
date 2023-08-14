import { useContext } from 'react'
import { WorkingEvidenceContextType } from './types'
import { WorkingEvidenceContext } from './context'

export const useWorkingEvidence = (): WorkingEvidenceContextType =>
  useContext(WorkingEvidenceContext)
