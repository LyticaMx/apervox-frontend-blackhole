import { CallModel } from './call'
import { Segment } from './segment'
import { ReceivedMedianVector, TransmitedMedianVector } from './vector'

export interface Tag {
  id: string
  label: string
  receptors: Receptor[]
}

export interface Receptor {
  id: string
  receptor_id: string
  received_audio?: ReceivedAudio
  tags: Tag[]
}

export interface ReceivedAudio {
  id: string
  name: string
  call: CallModel
  call_id: string
  receptor: Receptor
  receptor_id: string
  duration?: number
  segments: Segment[]
  median_vector?: ReceivedMedianVector
  created_at: string
  updated_at?: string
}

export interface TransmitedAudio {
  id: string
  name: string
  call: CallModel
  call_id: string
  duration?: number
  segments: Segment[]
  median_vector?: TransmitedMedianVector
  created_at: string
  updated_at?: string
}
