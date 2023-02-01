import { useContext } from 'react'
import { ContextType } from 'types/speaker'
import { SpeakersContext } from './context'

export const useSpeakers = (): ContextType => useContext(SpeakersContext)
