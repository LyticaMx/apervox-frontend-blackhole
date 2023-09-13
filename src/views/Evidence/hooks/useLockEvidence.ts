import { useEvidenceSocket } from 'context/EvidenceSocket'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { WorkingArgs, WorkingEvidence } from 'types/evidence'

export const useLockEvidence = (
  id: string,
  from: 'technique' | 'monitor',
  techniqueId?: string
): boolean => {
  const [canWork, setCanWork] = useState(false)
  const socket = useEvidenceSocket()
  const history = useHistory()

  // TODO: manejo de next evidence

  useEffect(() => {
    if (!socket) return

    const busyListener = (): void => {
      if (from === 'monitor') {
        history.replace(pathRoute.monitoring.history)
      } else history.replace(pathRoute.technique)
    }
    const workingListener = (evidence: WorkingEvidence): void => {
      if (evidence.id === id) setCanWork(true)
    }

    socket.on('busy_evidence', busyListener)
    socket.on('working_evidence', workingListener)

    const workingArgs: WorkingArgs = { id }
    if (from === 'monitor') socket.emit('working_evidence', workingArgs)
    else {
      workingArgs.technique_id = techniqueId
      socket.emit('working_evidence', workingArgs)
    }

    return () => {
      socket.off('busy_evidence', busyListener)
      socket.off('working_evidence', workingListener)
      socket.emit('release_evidence')
    }
  }, [socket, id, techniqueId])

  return canWork
}
