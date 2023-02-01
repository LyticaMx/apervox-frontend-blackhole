import { Context, createContext } from 'react'
import { CallDetailContextType } from 'types/call'

export const initialState: CallDetailContextType = {
  summary: {
    alert: false,
    assigned_pin: 0,
    date: '',
    hour: '',
    receiver: '',
    duration: ''
  },
  voiceControlSimilarity: 0,
  embedings: { received_embedding: false, transmitted_embedding: false },
  segmentList: { received: [], transmitted: [] },
  tagList: [],
  linkedTagList: { received: [], transmitted: [] },
  wordFrequency: { received: [], transmitted: [] }
}

export const CallDetailContext: Context<CallDetailContextType> =
  createContext(initialState)
