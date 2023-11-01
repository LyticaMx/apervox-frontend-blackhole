import { RegionInterface } from 'components/WaveSurferContext/types'
import { useEvidenceSocket } from 'context/EvidenceSocket'
import { useWorkingEvidence } from 'context/WorkingEvidence'
import { useEffect, useState } from 'react'

interface TaskStatus {
  task: 'Transcription' | 'Segmentation'
  status: 'PENDING' | 'STARTED' | 'SUCCESS' | 'FAILURE'
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
  lock: boolean
  progress: number
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
  const [progress, setProgress] = useState(0)

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

    getTranscription()
  }, [canWork])

  // Se puede dividir en 2 para manejar los eventos
  useEffect(() => {
    if (!socket || !canWork) return
    socket.send('enter_transcription_room', {})
  }, [socket, canWork])

  useEffect(() => {
    if (!socket) return
    const transcriptionStatusHandler = (status?: TaskStatus): void => {
      /* eslint-disable-next-line */
      console.log({ taskStatus: status })
      if (status) setLock(true)
      else setLock(false)
    }
    const transcriptionProgressHandler = (
      progress: TranscriptionProgress
    ): void => {
      /* eslint-disable-next-line */
      console.log({ progress })
      setProgress(+((progress.completed / progress.total) * 100).toFixed(2))
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
    progress
  }
}
