import { useContext } from 'react'
import { RTCPlayerContextType } from './types'
import { RTCPlayerContext } from './RTCPlayerContext'

export const useRTCPlayer = (): RTCPlayerContextType =>
  useContext(RTCPlayerContext)
