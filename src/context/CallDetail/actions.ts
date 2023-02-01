import { useDatesFilter } from 'context/DatesFilter'
import { subHours } from 'date-fns'
import useApi, { useService } from 'hooks/useApi'
import { MultipleUpdateEntity, ResponseData } from 'types/api'
import {
  SummaryCallDetailModel,
  CallDetailContextState,
  CallDetailActions,
  TagModel,
  CallType,
  DetailFilters
} from 'types/call'
import { DatesFilterForm } from 'types/datesFilter'
import { actions } from './constants'

export const useActions = (
  state: CallDetailContextState,
  dispatch
): CallDetailActions => {
  const singleCallService = useService('call')
  const tagService = useService('tags')
  const transcriptionService = useService('transcriptions')
  const { actions: actionsDates } = useDatesFilter()

  const callEmbeddingService = useApi({
    endpoint: 'get-generated-embedding',
    method: 'get'
  })

  const getSummaryCall = async (filters: DetailFilters): Promise<boolean> => {
    try {
      const response: ResponseData = await singleCallService.get({
        queryString: `${filters.id}/general-info`,
        urlParams: filters
      })

      if (response.data) {
        const summaryDetail: SummaryCallDetailModel = {
          alert: response.data.alert,
          assigned_pin: response.data.pin,
          receiver: response.data.reception_number,
          duration: response.data.duration,
          hour: response.data.hour_call_formated,
          date: response.data.date_call_formated
        }
        dispatch(actions.setSummary(summaryDetail))

        return true
      }

      return false
    } catch {
      return false
    }
  }

  const getGeneralTags = async (): Promise<boolean> => {
    try {
      const res: ResponseData = await tagService.get()

      if (res.data) {
        dispatch(actions.setGeneralTags(res.data))
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const getLinkedTags = async (filters: DetailFilters): Promise<boolean> => {
    try {
      const res: ResponseData = await singleCallService.get({
        queryString: `${filters.id}/tags`,
        urlParams: filters
      })

      if (res.data) {
        dispatch(actions.setLinkedTags(res.data))
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const getEmbedings = async (filters: DetailFilters): Promise<boolean> => {
    try {
      const res: ResponseData = await callEmbeddingService({
        urlParams: {
          id_call: filters.id,
          ...filters
        }
      })

      if (res.data) {
        dispatch(actions.setEmbedings(res.data))
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const getSegmentList = async (filters: DetailFilters): Promise<boolean> => {
    try {
      const res: ResponseData = await singleCallService.get({
        queryString: `${filters.id}/audio-segments`,
        urlParams: filters
      })

      if (res.data) {
        dispatch(actions.setSegmentList(res.data))
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const getTransmitterSimilarity = async (
    filters: DetailFilters
  ): Promise<boolean> => {
    try {
      const res: ResponseData = await singleCallService.get({
        queryString: `${filters.id}/similarity`,
        urlParams: filters
      })

      if (res.data) {
        dispatch(actions.setTransmitterSimilarity(res.data.similarity))
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const getWordFrequency = async (filters: DetailFilters): Promise<boolean> => {
    try {
      const res: ResponseData = await singleCallService.post({
        queryString: `${filters.id}/word-frequency`,
        urlParams: { id: filters.id }
      })

      if (res.data) {
        dispatch(actions.setWordFrequency(res.data))
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const getAllDetail = async (filters: DetailFilters): Promise<boolean> => {
    const fetch = [
      getSummaryCall(filters),
      getGeneralTags(),
      getLinkedTags(filters),
      getEmbedings(filters),
      getSegmentList(filters),
      getTransmitterSimilarity(filters),
      getWordFrequency(filters)
    ]

    const results = await Promise.all(fetch)
    const succesQuery = !results.some((res) => !res)

    return succesQuery
  }

  const createTag = async (label: string): Promise<TagModel> => {
    try {
      const res: ResponseData = await tagService.post({
        body: { label }
      })

      if (res.data) {
        return res.data
      }

      return { id: '', label: '' }
    } catch {
      return { id: '', label: '' }
    }
  }

  const linkTag = async (
    callId: string,
    tagId: string,
    type?: CallType,
    unlink?: boolean
  ): Promise<boolean> => {
    try {
      const res: ResponseData = await singleCallService.put({
        queryString: `${callId}/tags`,
        body: {
          tag_id: tagId,
          linking: !unlink,
          type: type === 1 ? 'TRANSMITTED' : 'RECEIVED'
        }
      })

      if (res.data) {
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const createVoicePrintReceived = async (
    id: string,
    type: 'TRANSMITTED_AUDIO' | 'RECEIVED_AUDIO'
  ): Promise<boolean> => {
    try {
      const res: ResponseData = await singleCallService.post({
        queryString: 'create-audio-embedding',
        urlParams: {
          type,
          audio_id: id
        }
      })

      if (res.data) {
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const updateTranscriptions = async (
    updatedSegments: MultipleUpdateEntity[]
  ): Promise<boolean> => {
    try {
      const res: ResponseData = await transcriptionService.put({
        body: {
          data: updatedSegments
        }
      })

      if (res.data) {
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const createAutomaticTranscription = async (
    type: 'TRANSMITTED_AUDIO' | 'RECEIVED_AUDIO',
    audioId: string
  ): Promise<boolean> => {
    try {
      const res: ResponseData = await singleCallService.post({
        queryString: `create-transciptions-dummy?type=${type}&audio_id=${audioId}`
      })

      if (res.data) {
        return res as any
      }

      return true
    } catch {
      return false
    }
  }

  const setDates = async (
    audioId: string,
    dates: DatesFilterForm
  ): Promise<void> => {
    try {
      let startTime = dates?.start_time ?? dates.start_time
      if (dates?.time) {
        startTime = subHours(new Date(), dates.time)
      }

      const newDates = {
        ...dates,
        start_time: startTime
      }

      if (audioId) {
        await getAllDetail({ ...dates, id: audioId })
      }
      actionsDates?.setForm(newDates)
    } catch {}
  }

  return {
    getSummaryCall,
    getGeneralTags,
    getLinkedTags,
    getEmbedings,
    getSegmentList,
    getTransmitterSimilarity,
    getWordFrequency,
    getAllDetail,
    createAutomaticTranscription,
    createTag,
    createVoicePrintReceived,
    linkTag,
    updateTranscriptions,
    setDates
  }
}
