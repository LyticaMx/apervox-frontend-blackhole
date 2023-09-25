import { useEvidenceSocket } from 'context/EvidenceSocket'
import { useCallback, useEffect, useRef } from 'react'
import { useCommentsContext } from '../context'

interface ChatMechanism {
  newMessage: (message: string) => void
}

export const useCommentsRoom = (
  id: string,
  canWork: boolean
): ChatMechanism => {
  const socket = useEvidenceSocket()
  const connectedToRoom = useRef(false)
  const { actions } = useCommentsContext()
  const pageRef = useRef<number>(1)

  const newMessage = useCallback(
    (message: string): void => {
      if (!socket) return
      socket.emit('new_comment', message)
    },
    [socket]
  )

  useEffect(() => {
    if (!socket) return

    const handleComments = (data): void => {
      connectedToRoom.current = true // Revisar si va aqui
      actions?.addComments(
        data.map((datum) => ({
          id: datum.id,
          author: datum.created_by?.username ?? '',
          authorId: datum.created_by?.id ?? '',
          createdAt: datum.created_at,
          data: datum.text,
          evidenceId: datum.call_evidence?.id,
          evidenceNumber: datum.call_evidence?.evidence_number,
          targetPhone: datum.target?.phone
        })),
        pageRef.current++
      )
    }

    const handleNewComment = (data): void => {
      try {
        actions?.createComment({
          id: data.id,
          author: data.created_by?.username ?? '',
          authorId: data.created_by?.id ?? '',
          createdAt: data.created_at,
          data: data.text,
          evidenceId: data.call_evidence?.id,
          evidenceNumber: data.call_evidence?.evidence_number,
          targetPhone: data.target?.phone
        })
      } catch {}
    }

    const handleUpdatedComment = (data): void => {
      try {
        actions?.updateComment({
          id: data.id,
          author: data.created_by?.username ?? '',
          authorId: data.created_by?.id ?? '',
          createdAt: data.created_at,
          data: data.text,
          evidenceId: data.call_evidence?.id,
          evidenceNumber: data.call_evidence?.evidence_number,
          targetPhone: data.target?.phone
        })
      } catch {}
    }

    socket.on('comments', handleComments)
    socket.on('new_comment', handleNewComment)
    socket.on('updated_comment', handleUpdatedComment)

    return () => {
      socket.off('comments', handleComments)
      socket.off('new_comment', handleNewComment)
      socket.off('updated_comment', handleUpdatedComment)
    }
  }, [socket, actions, id])

  useEffect(() => {
    if (!canWork) {
      connectedToRoom.current = false
      pageRef.current = 1
      return
    }
    if (!socket) return

    socket.emit('enter_room', {})

    return () => {
      if (connectedToRoom.current) {
        socket.emit('leave_room', {})
      }
    }
  }, [canWork, socket, id])

  return {
    newMessage
  }
}
