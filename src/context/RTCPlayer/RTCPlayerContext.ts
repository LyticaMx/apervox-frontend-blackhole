import { Context, createContext } from 'react'
import { RTCPlayerContextType } from './types'

const initialState: RTCPlayerContextType = {
  roomName: ''
}

export const RTCPlayerContext: Context<RTCPlayerContextType> =
  createContext(initialState)
