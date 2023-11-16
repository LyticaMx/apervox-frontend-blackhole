import { ReactElement, ReactNode, useMemo, useState } from 'react'
import { RTCPlayerContextType } from './types'
import { RTCPlayerContext } from './RTCPlayerContext'

interface Props {
  children: ReactNode
}

const RTCPlayerProvider = ({ children }: Props): ReactElement => {
  const [room, setRoom] = useState<string>('')
  const [evidenceID, setEvidenceID] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [target, setTarget] = useState<string | undefined>()

  const joinRoom = (
    roomName: string,
    phoneNumber: string,
    target?: string
  ): void => {
    setEvidenceID('')
    setRoom(roomName)
    setPhoneNumber(phoneNumber)
    if (target) setTarget(target)
  }

  const playEvidence = (
    evidenceID: string,
    phoneNumber: string,
    target?: string
  ): void => {
    setRoom('')
    setEvidenceID(evidenceID)
    setPhoneNumber(phoneNumber)
    if (target) setTarget(target)
  }

  const hidePlayer = (): void => {
    setRoom('')
    setEvidenceID('')
  }

  const contextValue = useMemo<RTCPlayerContextType>(
    () => ({
      roomName: room,
      phoneNumber,
      target,
      evidenceID,
      actions: {
        hidePlayer,
        joinRoom,
        playEvidence
      }
    }),
    [room, evidenceID]
  )

  return (
    <RTCPlayerContext.Provider value={contextValue}>
      {children}
    </RTCPlayerContext.Provider>
  )
}

export { RTCPlayerProvider }
