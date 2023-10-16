import { useAuth } from 'context/Auth'
import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { LiveCallSocketContext } from './context'
import { LiveCall } from 'context/Monitoring/types'
import { CallEvidenceForSocket, ContextState } from './types'

import useApi from 'hooks/useApi'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

interface Props {
  children: ReactNode
}

const LiveCallSocketProvider = (props: Props): ReactElement => {
  const { children } = props
  const [socket, setSocket] = useState<Socket | null>(null)
  const [callEvidences, setCallEvidences] = useState<LiveCall[]>([])
  const {
    auth: { isLogguedIn, token }
  } = useAuth()
  const ability = useAbility()

  const liveCallsApi = useApi({
    endpoint: 'call-evidences/monitor/live',
    method: 'get'
  })

  const getLiveCalls = async (): Promise<void> => {
    try {
      const response = await liveCallsApi({ urlParams: { limit: -1, page: 1 } })
      setCallEvidences(
        response.data.map((call) => ({
          id: call.id,
          carrier: call.carrier,
          date: call.call_start_date,
          priority: call.technique?.priority ?? '',
          status: call.type.includes('live') ? 'live' : 'ended',
          target: call.target_phone,
          technique: call.technique?.name,
          type: call.type.split('_')[0]
        }))
      )
    } catch {}
  }

  useEffect(() => {
    if (ability.cannot(ACTION.READ, SUBJECT.CALL_EVIDENCES)) return
    const callErrorListener = (error: any): void => {
      console.error(error)
    }

    if (isLogguedIn) {
      const socket = io(`${process.env.REACT_APP_MAIN_SOCKET_URL}/monitor`)
      socket.on('error', callErrorListener)
      socket.emit('validate_token', { token })
      getLiveCalls()
      setSocket(socket)
    }

    return () => {
      if (socket) {
        socket.off('error', callErrorListener)
        socket.disconnect()
      }
    }
  }, [isLogguedIn, ability.rules])

  useEffect(() => {
    if (!socket) return

    const newCallListener = (call: CallEvidenceForSocket): void => {
      setCallEvidences((old) => [
        {
          id: call.id,
          carrier: call.carrier,
          date: call.call_start_date,
          priority: call.technique?.priority ?? '',
          status: call.type.includes('live') ? 'live' : 'ended',
          target: call.target_phone,
          technique: call.technique?.name,
          type: call.type.split('_')[0]
        },
        ...old
      ])
    }
    const callEndedListener = (endedCall: CallEvidenceForSocket): void => {
      setCallEvidences((old) => old.filter((call) => call.id !== endedCall.id))
    }
    socket.on('new_call', newCallListener)
    socket.on('call_ended', callEndedListener)

    return () => {
      socket.off('new_call', newCallListener)
      socket.off('call_ended', callEndedListener)
    }
  }, [socket, callEvidences])

  const contextValue = useMemo<ContextState>(
    () => ({
      socket,
      data: callEvidences
    }),
    [socket, callEvidences]
  )

  return (
    <LiveCallSocketContext.Provider value={contextValue}>
      {children}
    </LiveCallSocketContext.Provider>
  )
}

export { LiveCallSocketProvider }
