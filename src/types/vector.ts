import { TransmitedAudio } from './audio'
import { ControlGroup } from './control'
import { Segment } from './segment'

export interface Vector {
  id: string
  values: object
  segment: Segment
  segment_id: string
  created_at: string
  updated_at?: string
}

export interface TransmitedMedianVector {
  id: string
  ordinance_index?: number
  audio: TransmitedAudio
  audio_id: string
  created_at: string
  updated_at: string
}

export interface ReceivedMedianVector {
  id: string
  ordinance_index?: number
  // audio ReceiveGroup @relation(fields: [audio_id], references:[id])
  audio_id: string
  created_at: string
  updated_at: string
}

export interface ControlMedianVector {
  id: string
  ordinance_index?: number
  values: object
  group: ControlGroup
  group_id: string
  created_at: string
  updated_at: string
}
