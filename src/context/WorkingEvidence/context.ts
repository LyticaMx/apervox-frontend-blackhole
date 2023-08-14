import { Context, createContext } from 'react'
import { WorkingEvidence, WorkingEvidenceContextType } from './types'

export const initialState: WorkingEvidence = {
  duration: 0,
  evidenceNumber: '',
  follow: false,
  targetPhone: '',
  tiName: '',
  classification: '',
  synopsis: ''
}

export const WorkingEvidenceContext: Context<WorkingEvidenceContextType> =
  createContext(initialState)
