import { ReactElement, ReactNode, useMemo, useState } from 'react'
import {
  Region,
  TranscriptionSegment,
  UpdateData,
  WorkingEvidence,
  WorkingEvidenceActions,
  WorkingEvidenceContextType
} from './types'
import { WorkingEvidenceContext, initialState } from './context'
import { useService } from 'hooks/useApi'
import { useAuth } from 'context/Auth'
import { DocumentType } from 'types/utils'
import useDownloadFile from 'hooks/useDownloadFile'

interface Props {
  children: ReactNode
}

const WorkingEvidenceProvider = (props: Props): ReactElement => {
  const { children } = props
  const {
    auth: { token },
    actions: authActions
  } = useAuth()
  const [workingEvidence, setWorkingEvidence] = useState(initialState)
  const evidenceService = useService('call-evidences')
  const exportTranscriptionService = useDownloadFile({
    endpoint: 'exports/call-evidences',
    method: 'get'
  })

  const setEvidence = (id?: string): void => {
    if (!id) {
      setWorkingEvidence(initialState)
      return
    }
    setWorkingEvidence({ ...initialState, id })
  }

  const getData = async (): Promise<void> => {
    try {
      if (!workingEvidence.id) return
      const response = await evidenceService.get({
        queryString: `${workingEvidence.id}`
      })

      const evidenceData: WorkingEvidence = {
        id: workingEvidence.id,
        evidenceNumber: response.data.evidence_number,
        duration: response.data.duration,
        follow: response.data.is_tracked,
        startDate: response.data.call_start_date,
        endDate: response.data.call_end_date,
        targetPhone: response.data.target_phone,
        tiName: response.data.technique?.name ?? '',
        classification: response.data.relevance,
        synopsis: ''
      }

      if (response.data.label) {
        evidenceData.label = {
          id: response.data.label.id,
          color: response.data.label.color,
          value: response.data.label.name
        }
      } else {
        evidenceData.label = {
          value: response.data.other_label ?? ''
        }
      }

      try {
        const response = await evidenceService.get({
          queryString: `${workingEvidence.id}/synopsis`
        })
        evidenceData.synopsis = response.data.content ?? ''
      } catch {}

      setWorkingEvidence(evidenceData)
    } catch (e) {}
  }

  const updateSynopsis = async (content: string): Promise<boolean> => {
    try {
      if (!workingEvidence.id) return false
      await evidenceService.put({
        queryString: `${workingEvidence.id}/synopsis`,
        body: {
          content
        }
      })

      setWorkingEvidence((workingEvidence) => ({
        ...workingEvidence,
        synopsis: content
      }))

      return true
    } catch {
      return false
    }
  }

  const getAudioUrl = async (): Promise<string> => {
    try {
      if (!workingEvidence.id) return ''
      await authActions?.refreshToken()
      return `${process.env.REACT_APP_MAIN_BACKEND_URL}call-evidences/${
        workingEvidence.id ?? 0
      }/compressed-audio?extension=opus&token=${token}`
    } catch {
      return ''
    }
  }

  const getAudioWave = async (): Promise<number[]> => {
    try {
      if (!workingEvidence.id) return []
      const response = await evidenceService.get({
        queryString: `${workingEvidence.id}/waveform`
      })
      return response?.data ?? []
    } catch {
      return []
    }
  }

  const updateFollow = async (): Promise<boolean> => {
    try {
      if (!workingEvidence.id) return false
      const response = await evidenceService.put({
        queryString: `${workingEvidence.id}/tracking`
      })

      setWorkingEvidence({
        ...workingEvidence,
        follow: response.data.is_tracked
      })

      return true
    } catch {
      return false
    }
  }

  const classifyEvidence = async (data: UpdateData): Promise<boolean> => {
    try {
      if (!workingEvidence.id) return false
      await evidenceService.put({
        queryString: `${workingEvidence.id}`,
        body: {
          label_id: data.label,
          other_label: data.customLabel,
          is_tracked: data.isTracked,
          relevance: data.classification
        }
      })
      return true
    } catch {
      return false
    }
  }

  const getTranscriptionSegments = async (): Promise<
    TranscriptionSegment[]
  > => {
    try {
      if (!workingEvidence.id) return []

      const response = await evidenceService.get({
        queryString: `${workingEvidence.id}/transcriptions`
      })

      return ((response.data?.segments as any[]) ?? []).map((item) => ({
        id: item.id,
        text: item.content,
        startTime: item.start_time,
        endTime: item.end_time
      }))
    } catch {
      return []
    }
  }

  const createFullTranscription = async (): Promise<void> => {
    try {
      if (!workingEvidence.id) return
      await evidenceService.post({
        queryString: `${workingEvidence.id}/transcriptions`
      })
    } catch {}
  }

  const updateTranscriptionSegments = async (
    segments: TranscriptionSegment[]
  ): Promise<TranscriptionSegment[]> => {
    try {
      if (!workingEvidence.id) return []

      const response = await evidenceService.put({
        queryString: `${workingEvidence.id}/transcriptions`,
        body: segments.map((item) => ({
          id: item.id,
          start_time: item.startTime,
          end_time: item.endTime,
          content: item.text
        }))
      })

      return (response.data.segments ?? []).map((segment) => ({
        id: segment.id,
        text: segment.content,
        startTime: segment.start_time,
        endTime: segment.end_time
      }))
    } catch {
      return []
    }
  }

  const deleteTranscriptionSegment = async (id: string): Promise<boolean> => {
    try {
      if (!workingEvidence.id) return false
      await evidenceService.delete({
        queryString: `${workingEvidence.id}/transcriptions/${id}`
      })
      return true
    } catch {
      return false
    }
  }

  const getRegions = async (): Promise<Region[]> => {
    try {
      if (!workingEvidence.id) return []

      const response = await evidenceService.get({
        queryString: `${workingEvidence.id}/regions`
      })

      return (response.data as any[]).map((item) => ({
        id: item.id,
        startTime: item.start_time,
        endTime: item.end_time,
        tag: item.tag
      }))
    } catch {
      return []
    }
  }

  const updateRegions = async (regions: Region[]): Promise<Region[]> => {
    try {
      if (!workingEvidence.id) return []
      const response = await evidenceService.put({
        queryString: `${workingEvidence.id}/regions`,
        body: regions.map((item) => ({
          id: item.id,
          start_time: item.startTime,
          end_time: item.endTime,
          tag: item.tag
        }))
      })

      return (response.data as any[]).map((item) => ({
        id: item.id,
        startTime: item.start_time,
        endTime: item.end_time,
        tag: item.tag
      }))
    } catch {
      return []
    }
  }

  const deleteRegion = async (id: string): Promise<boolean> => {
    try {
      if (!workingEvidence.id) return false
      await evidenceService.delete({
        queryString: `${workingEvidence.id}/regions/${id}`
      })
      return true
    } catch {
      return false
    }
  }

  const exportTranscription = async (document: DocumentType): Promise<void> => {
    try {
      if (!workingEvidence.id) return
      await exportTranscriptionService('transcription', {
        queryString: `${workingEvidence.id}/transcriptions`,
        urlParams: {
          export_type: document
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  const actions: WorkingEvidenceActions = {
    setEvidence,
    getData,
    updateSynopsis,
    getAudioUrl,
    getAudioWave,
    updateFollow,
    classifyEvidence,
    getTranscriptionSegments,
    createFullTranscription,
    updateTranscriptionSegments,
    deleteTranscriptionSegment,
    getRegions,
    updateRegions,
    deleteRegion,
    exportTranscription
  }

  const contextValue = useMemo<WorkingEvidenceContextType>(
    () =>
      Object.assign(workingEvidence, {
        actions
      }),
    [workingEvidence]
  )

  return (
    <WorkingEvidenceContext.Provider value={contextValue}>
      {children}
    </WorkingEvidenceContext.Provider>
  )
}

export { WorkingEvidenceProvider }
