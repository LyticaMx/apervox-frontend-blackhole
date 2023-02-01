import {
  ControlMedianVector,
  ReceivedMedianVector,
  TransmitedMedianVector
} from './vector'

export interface TransmitedTransmitedComparison {
  id: string
  base_vector: TransmitedMedianVector
  base_vector_id: string
  objective_vector: TransmitedMedianVector
  objective_vector_id: string
  similarity: number
  created_at: string
  updated_at: string
}

export interface TransmitedControlComparison {
  id: string
  base_vector: TransmitedMedianVector
  base_vector_id: string
  objective_vector: ControlMedianVector
  objective_vector_id: string
  similarity: number
  created_at: string
  updated_at: string
}

export interface ReceivedReceivedComparison {
  id: string
  base_vector: ReceivedMedianVector
  base_vector_id: string
  objective_vector: ReceivedMedianVector
  objective_vector_id: string
  similarity: number
  created_at: string
  updated_at: string
}
