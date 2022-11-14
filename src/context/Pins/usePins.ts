import { useContext } from 'react'
import { PinsContextType } from 'types/pin'
import { PinsContext } from './context'

export const usePins = (): PinsContextType => useContext(PinsContext)
