export interface InnerLabel {
  id?: string
  color?: string
  value: string
}

export interface WorkingEvidence {
  id?: string
  evidenceNumber: string
  tiName: string
  startDate?: string
  endDate?: string
  duration?: number
  targetPhone: string
  filename?: string // Revisar si se utilizara el campo
  sourceDevice?: string // Revisar si se utilizara el campo
  label?: InnerLabel
  classification: string
  follow: boolean
  synopsis: string
}

export interface UpdateData {
  label?: string
  customLabel?: string
  classification: 'relevant' | 'not_relevant' | 'discarded' | 'unclassified'
  isTracked?: boolean
}

export interface TranscriptionSegment {
  id?: string
  startTime: number
  endTime: number
  text: string
}

export interface Region {
  id?: string
  startTime: number
  endTime: number
  tag: string
}

export interface WorkingEvidenceActions {
  setEvidence: (id?: string) => void
  getData: () => Promise<void>
  classifyEvidence: (data: UpdateData) => Promise<boolean>
  updateFollow: () => Promise<boolean>
  updateSynopsis: (synopsis: string) => Promise<boolean>
  getAudioUrl: () => string
  getAudioWave: () => Promise<number[]>
  updateTranscriptionSegments: (
    segments: TranscriptionSegment[]
  ) => Promise<TranscriptionSegment[]>
  deleteTranscriptionSegment: (id: string) => Promise<boolean>
  getTranscriptionSegments: () => Promise<TranscriptionSegment[]>
  getRegions: () => Promise<Region[]>
  updateRegions: (regions: Region[]) => Promise<boolean>
  deleteRegion: (id: string) => Promise<boolean>
}

export interface WorkingEvidenceContextType extends WorkingEvidence {
  actions?: WorkingEvidenceActions
}
