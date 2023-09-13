export interface WorkingArgs {
  id: string
  technique_id?: string
}

export interface WorkingEvidence {
  id: string
  working_by: {
    id: string
    username: string
  }
}
export interface ReleaseEvidence {
  id: string
}

export interface TrackingEvidenceEvent {
  id: string
  is_tracked: boolean
  // TODO: falta el tracked by
}
