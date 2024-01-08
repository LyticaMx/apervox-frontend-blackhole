import { RegionInterface } from 'components/WaveSurferContext/types'
import { useEvidenceSocket } from 'context/EvidenceSocket'
import { useWorkingEvidence } from 'context/WorkingEvidence'
import useToast from 'hooks/useToast'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { transcriptionSocketMessages } from '../messages'

interface TranscriptionStatus {
  task: 'Transcription' | 'Segmentation' | 'IDLE'
  status: 'PENDING' | 'STARTED' | 'SUCCESS' | 'FAILURE' | 'IDLE' | 'REVOKED'
}

interface TranscriptionProgress {
  total: number
  completed: number
  segment: {
    id: string
    start_time: number
    end_time: number
    content: string
  }
}

interface TranscriptionCRUD {
  transcriptionRegions: RegionInterface[]
  handleChangeSegment: (id: string, value: string) => void
  setTranscriptionRegions: React.Dispatch<
    React.SetStateAction<RegionInterface[]>
  >
  updateTranscription: () => Promise<void>
  forceLock: () => void
  lock: boolean
  progress: number
  canCancelTranscription: boolean
}

export const useTranscription = (
  id: string,
  canWork: boolean
): TranscriptionCRUD => {
  const socket = useEvidenceSocket()
  const workingEvidence = useWorkingEvidence()
  const [transcriptionRegions, setTranscriptionRegions] = useState<
    RegionInterface[]
  >([])
  const [lock, setLock] = useState(false)
  const [canCancelTranscription, setCanCancelTranscription] = useState(false)
  const [progress, setProgress] = useState(0)
  const { formatMessage } = useIntl()
  const toast = useToast()

  const getTranscription = async (): Promise<void> => {
    try {
      const regions =
        (await workingEvidence.actions?.getTranscriptionSegments()) ?? []
      setTranscriptionRegions(
        regions.map<RegionInterface>((region) => {
          return {
            id: region.id ?? '',
            start: region.startTime,
            end: region.endTime,
            data: { text: region.text }
          }
        })
      )
    } catch {
      setTranscriptionRegions([])
    }
  }

  const handleChangeSegment = (id: string, value: string): void => {
    setTranscriptionRegions((regions) =>
      regions.map((region) =>
        region.id === id ? { ...region, data: { text: value } } : region
      )
    )
  }

  const updateTranscription = async (): Promise<void> => {
    try {
      const regionsToUpdate = transcriptionRegions.map((region) => {
        if (!region.id.startsWith('wavesurfer')) {
          return {
            id: region.id,
            startTime: region.start,
            endTime: region.end,
            text: region.data?.text ?? ''
          }
        }

        return {
          startTime: region.start,
          endTime: region.end,
          text: region.data?.text ?? ''
        }
      })

      const updated =
        (await workingEvidence.actions?.updateTranscriptionSegments(
          regionsToUpdate
        )) ?? []

      setTranscriptionRegions(
        updated.map<RegionInterface>((region) => {
          return {
            id: region.id ?? '',
            start: region.startTime,
            end: region.endTime,
            data: { text: region.text }
          }
        })
      )
    } catch {}
  }

  useEffect(() => {
    if (!canWork) return

    setProgress(0)
    getTranscription()
  }, [canWork])

  // Se puede dividir en 2 para manejar los eventos
  useEffect(() => {
    if (!socket || !canWork) return
    socket.emit('enter_transcription_room', {})
  }, [socket, canWork])

  useEffect(() => {
    if (!socket) return
    const transcriptionStatusHandler = (
      transcriptionStatus: TranscriptionStatus = {
        status: 'STARTED',
        task: 'Transcription'
      }
    ): void => {
      const { status, task } = transcriptionStatus
      if (task === 'IDLE') {
        setLock(false)
        return
      }
      if (status === 'FAILURE') {
        // TODO: Revisar si termina las tareas al momento de fallar la transcripción
        toast.danger(
          formatMessage(transcriptionSocketMessages.anErrorOcurred, {
            type: task
          })
        )
        setLock(false)
        setCanCancelTranscription(false)
        return
      }
      if (status === 'REVOKED') {
        toast.info(formatMessage(transcriptionSocketMessages.cancelled))
        setLock(false)
        setCanCancelTranscription(false)
        setTimeout(() => {
          setProgress(0)
        }, 500)
        return
      }
      if (status !== 'IDLE') {
        setLock(true)
        if (status === 'PENDING') {
          if (task === 'Segmentation') {
            setTranscriptionRegions([])
            setCanCancelTranscription(true)
          }
          toast.info(
            formatMessage(transcriptionSocketMessages.addedPendingTask, {
              type: task
            })
          )
        } else if (status === 'STARTED') {
          toast.info(
            formatMessage(transcriptionSocketMessages.startedTask, {
              type: task
            })
          )
        } else if (status === 'SUCCESS') {
          toast.success(
            formatMessage(transcriptionSocketMessages.endedTask, { type: task })
          )
          if (task === 'Segmentation') {
            setTranscriptionRegions([])
          }
          if (task === 'Transcription') {
            setLock(false)
            setCanCancelTranscription(false)
            setTimeout(() => {
              setProgress(0)
            }, 500)
          }
        }
      }
    }
    const transcriptionProgressHandler = (
      progress: TranscriptionProgress
    ): void => {
      /* eslint-disable-next-line */
      console.log({ progress })
      setProgress(+((progress.completed / progress.total) * 100).toFixed(2))
      if (
        transcriptionRegions.some((region) => region.id === progress.segment.id)
      ) {
        setTranscriptionRegions((regions) =>
          regions.map((region) =>
            region.id === progress.segment.id
              ? {
                  id: progress.segment.id,
                  start: progress.segment.start_time,
                  end: progress.segment.end_time,
                  data: { text: progress.segment.content }
                }
              : region
          )
        )
      } else {
        setTranscriptionRegions((regions) => [
          ...regions,
          {
            id: progress.segment.id,
            start: progress.segment.start_time,
            end: progress.segment.end_time,
            data: { text: progress.segment.content }
          }
        ])
      }
    }

    socket.on('transcription_status', transcriptionStatusHandler)
    socket.on('transcription_progress', transcriptionProgressHandler)
    return () => {
      socket.off('transcription_status', transcriptionStatusHandler)
      socket.off('transcription_progress', transcriptionProgressHandler)
    }
  }, [socket, transcriptionRegions])

  return {
    transcriptionRegions,
    handleChangeSegment,
    updateTranscription,
    setTranscriptionRegions,
    lock,
    canCancelTranscription,
    forceLock: () => setLock(true),
    progress
  }
}
