import { ReactElement, ReactNode, useMemo, useState } from 'react'
import { RTCPlayerContextType } from './types'
import { RTCPlayerContext } from './RTCPlayerContext'
import useApi from 'hooks/useApi'

interface Props {
  children: ReactNode
}

const RTCPlayerProvider = ({ children }: Props): ReactElement => {
  const [room, setRoom] = useState<string>('')
  const [evidenceID, setEvidenceID] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [target, setTarget] = useState<string | undefined>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getFilename = useApi({
    endpoint: 'call-evidences',
    method: 'get'
  })

  const joinRoom = async (
    id: string,
    phoneNumber: string,
    target?: string
  ): Promise<void> => {
    try {
      const response = await getFilename(
        {
          queryString: `${id}/filename`
        },
        { 'x-api-key': process.env.REACT_APP_X_API_KEY }
      )

      setEvidenceID('')
      setRoom(response.data.filename)
      setPhoneNumber(phoneNumber)
      if (target) setTarget(target)
    } catch {}
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
