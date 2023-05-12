import { useContext } from 'react'
import { DevicesContext } from './context'
import { ContextType } from './types'

export const useDevices = (): ContextType =>
  useContext(DevicesContext)
