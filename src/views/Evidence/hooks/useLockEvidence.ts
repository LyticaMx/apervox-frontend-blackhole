import { useEvidenceSocket } from 'context/EvidenceSocket'
import { useLoader } from 'context/Loader'
import { useWorkingEvidence } from 'context/WorkingEvidence'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { NextEvidence, WorkingArgs, WorkingEvidence } from 'types/evidence'

interface LockMechanism {
  canWork: boolean
  getNextEvidence: () => void
}

export const useLockEvidence = (
  id: string,
  from: 'technique' | 'monitor',
  techniqueId?: string
): LockMechanism => {
  const [canWork, setCanWork] = useState(false)
  const { actions: loaderActions } = useLoader()
  const { actions: workingEvidenceActions } = useWorkingEvidence()
  const nextRef = useRef<boolean>(false)
  const socket = useEvidenceSocket()
  const history = useHistory()

  const getNextEvidence = useCallback(() => {
    if (!socket) return
    loaderActions?.showLoader()
    nextRef.current = true
    socket.emit('next_evidence', {})
  }, [socket])

  useEffect(() => {
    if (!socket) return () => {}

    const busyListener = (): void => {
      if (from === 'monitor') {
        history.replace(pathRoute.monitoring.history)
      } else history.replace(pathRoute.technique)
    }
    const workingListener = (evidence: WorkingEvidence): void => {
      if (evidence.id === id) {
        setCanWork(true)
      }
    }
    const nextEvidenceListener = (evidence: NextEvidence): void => {
      loaderActions?.hideLoader()
      if (evidence.id === null) {
        return
      }

      setCanWork(false)
      workingEvidenceActions?.setEvidence(evidence.id)
    }

    socket.on('busy_evidence', busyListener)
    socket.on('working_evidence', workingListener)
    socket.on('next_evidence', nextEvidenceListener)

    if (!nextRef.current) {
      const workingArgs: WorkingArgs = { id }
      if (from === 'monitor') socket.emit('working_evidence', workingArgs)
      else {
        workingArgs.technique_id = techniqueId
        socket.emit('working_evidence', workingArgs)
      }
    } else nextRef.current = false

    return () => {
      socket.off('busy_evidence', busyListener)
      socket.off('working_evidence', workingListener)
      socket.off('next_evidence', nextEvidenceListener)
      if (!nextRef.current) socket.emit('release_evidence', {})
    }
  }, [socket, id, techniqueId])

  return { canWork, getNextEvidence }
}
