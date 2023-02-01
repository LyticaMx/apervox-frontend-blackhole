import { useContext } from 'react'
import { CallDetailContextType } from 'types/call'
import { CallDetailContext } from './context'

export const useCallDetail = (): CallDetailContextType =>
  useContext(CallDetailContext)
