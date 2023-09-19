import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { EvidenceSocketContext } from './context'
import { useAuth } from 'context/Auth'

interface Props {
  children: ReactNode
}

const EvidenceSocketProvider = (props: Props): ReactElement => {
  const { children } = props
  const {
    auth: { isLogguedIn, token }
  } = useAuth()
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (isLogguedIn) {
      const socket = io(`${process.env.REACT_APP_MAIN_SOCKET_URL}/evidences`)

      socket.on('connect', () => {
        console.log('Client connected to evidences namespace')

        socket.emit('validate_token', { token })
      })

      socket.on('disconnect', (reason) => {
        console.log(`Client disconnected ${reason}`)
      })

      setSocket(socket)
    }

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [isLogguedIn])

  return (
    <EvidenceSocketContext.Provider value={socket}>
      {children}
    </EvidenceSocketContext.Provider>
  )
}

export { EvidenceSocketProvider }
