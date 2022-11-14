import { createContext, Context } from 'react'
import { PinsContextType } from 'types/pin'

export const initialState: PinsContextType = {
  listOfPins: [],
  listOfChunks: []
}

export const PinsContext: Context<PinsContextType> = createContext(initialState)
