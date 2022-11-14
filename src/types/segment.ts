import { Vector } from './vector'

export interface Segment {
  id: string
  start_time: number
  end_time: number
  // audio: Audio @relation(fields: [audio_id], references: [id])
  audio_id: string
  vector?: Vector
  transcription: string
  created_at: string
  updated_at?: string
}
