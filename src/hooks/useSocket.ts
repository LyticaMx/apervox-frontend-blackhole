import { useAuth } from 'context/Auth'
import { useSettings } from 'context/Settings'
import { useEffect, useRef, useState } from 'react'
import io, { ManagerOptions, SocketOptions, Socket } from 'socket.io-client'

const useSocket = (
  opts?: Partial<ManagerOptions & SocketOptions & { namespace: string }>
): {
  socket: Socket | undefined
  isSocketConnected: boolean
} => {
  const socket = useRef<Socket | undefined>()
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false)
  const { actions: settingsActions } = useSettings()
  // Se declara el ref para que quede el valor correcto en el socket
  const settingsActionsRef = useRef(settingsActions)
  const { auth } = useAuth()

  useEffect(() => {
    if (!auth.isLogguedIn) return
    if (process.env.REACT_APP_MAIN_SOCKET_URL) {
      socket.current = io(
        `${process.env.REACT_APP_MAIN_SOCKET_URL}${
          opts?.namespace ? `/${opts.namespace}` : ''
        }`,
        opts
      )

      socket.current.on('connect', () => {
        console.log(`Client connected: ${socket.current?.id}`)
        setIsSocketConnected(true)
      })

      socket.current.on('settings', (data) => {
        console.log('hola', data)
        settingsActionsRef.current?.update(
          {
            inactivityTime: data.inactivity_time,
            doubleValidation: data.double_validation
          },
          true
        )
      })

      socket.current.on('disconnect', (reason) => {
        console.log(`Client disconnected: ${reason}`)
        setIsSocketConnected(false)
      })

      socket.current.on('connect_error', (reason) =>
        console.log(`Client connect_error: ${reason.message}`)
      )
    }

    return () => {
      if (socket.current) socket.current.disconnect()
    }
  }, [auth.isLogguedIn])

  return { socket: socket.current, isSocketConnected }
}

export { useSocket }
