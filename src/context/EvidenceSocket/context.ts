import { Context, createContext } from 'react'
import { Socket } from 'socket.io-client'

export const EvidenceSocketContext: Context<Socket | null> =
  createContext<Socket | null>(null)
