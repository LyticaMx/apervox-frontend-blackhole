export type EvidenceType = 'audio' | 'video' | 'image' | 'document'

export interface Label {
  id: string
  name: string
  evidence_type: EvidenceType
  color: string
  created_at: string
}
