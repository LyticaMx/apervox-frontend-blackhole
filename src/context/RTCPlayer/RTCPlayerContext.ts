import { Context, createContext } from 'react'
import { RTCPlayerContextType } from './types'

const initialState: RTCPlayerContextType = {
  roomName: '',
  evidenceID: '',
  phoneNumber: ''
}

export const RTCPlayerContext: Context<RTCPlayerContextType> =
  createContext(initialState)
