import { ReactElement, ReactNode, useMemo, useState } from 'react'
import { RTCPlayerContextType } from './types'
import { RTCPlayerContext } from './RTCPlayerContext'

interface Props {
  children: ReactNode
}

const RTCPlayerProvider = ({ children }: Props): ReactElement => {
  const [room, setRoom] = useState<string>('')

  const joinRoom = (roomName: string): void => setRoom(roomName)
  const hidePlayer = (): void => setRoom('')

  const contextValue = useMemo<RTCPlayerContextType>(
    () => ({
      roomName: room,
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
