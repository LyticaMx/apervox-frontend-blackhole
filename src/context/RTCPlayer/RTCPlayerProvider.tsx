import { ReactElement, ReactNode, useMemo, useState } from 'react'
import { RTCPlayerContextType } from './types'
import { RTCPlayerContext } from './RTCPlayerContext'

interface Props {
  children: ReactNode
}

const RTCPlayerProvider = ({ children }: Props): ReactElement => {
  const [room, setRoom] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [target, setTarget] = useState<string | undefined>()

  const joinRoom = (
    roomName: string,
    phoneNumber: string,
    target?: string
  ): void => {
    setRoom(roomName)
    setPhoneNumber(phoneNumber)
    if (target) setTarget(target)
  }
  const hidePlayer = (): void => setRoom('')

  const contextValue = useMemo<RTCPlayerContextType>(
    () => ({
      roomName: room,
      phoneNumber,
      target,
      actions: {
        hidePlayer,
        joinRoom
      }
    }),
    [room]
  )

  return (
    <RTCPlayerContext.Provider value={contextValue}>
      {children}
    </RTCPlayerContext.Provider>
  )
}

export { RTCPlayerProvider }
