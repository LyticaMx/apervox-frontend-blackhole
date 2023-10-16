import { LiveCall } from 'context/Monitoring/types'
import { Socket } from 'socket.io-client'

export interface CallEvidenceForSocket {
  id: string
  call_start_date: string
  call_end_date?: string
  type: string
  target_phone: string
  carrier: string
  technique: {
    id: string
    name: string
    priority: string
  }
}

export interface ContextState {
  data: LiveCall[]
  socket: Socket | null
}
