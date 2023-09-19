import { useContext } from 'react'
import { Socket } from 'socket.io-client'
import { EvidenceSocketContext } from './context'

export const useEvidenceSocket = (): Socket | null =>
  useContext(EvidenceSocketContext)
