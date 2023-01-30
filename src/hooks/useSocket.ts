import { useEffect, useRef } from 'react'
import io, { ManagerOptions, SocketOptions, Socket } from 'socket.io-client'

const useSocket = (
  opts?: Partial<ManagerOptions & SocketOptions>
): Socket | undefined => {
  const socket = useRef<Socket | undefined>()
  useEffect(() => {
    if (process.env.REACT_APP_MAIN_BACKEND_URL) {
      socket.current = io(process.env.REACT_APP_MAIN_BACKEND_URL, opts)

      socket.current.on('connect', () =>
        console.log(`Client connected: ${socket.current?.id}`)
      )

      socket.current.on('disconnect', (reason) =>
        console.log(`Client disconnected: ${reason}`)
      )

      socket.current.on('connect_error', (reason) =>
        console.log(`Client connect_error: ${reason.message}`)
      )
    }

    return () => {
      if (socket.current) socket.current.disconnect()
    }
  }, [])

  //   const on = (ev: string, listener): void => {
  //     if (socket.current) socket.current.on(ev, listener)
  //   }

  //   const emmit = (): void => {
  //     if (socket.current) socket.current.emmit()
  //   }

  return socket.current
}

export { useSocket }
