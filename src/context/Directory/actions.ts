import { useDatesFilter } from 'context/DatesFilter'
import { subHours } from 'date-fns'
import useApi from 'hooks/useApi'
import { CallModel } from 'types/call'
import { DatesFilterForm } from 'types/datesFilter'
import {
  Charts,
  DirectoryActions,
  DirectoryContextState,
  HistoryCall,
  PinFilters,
  SpeakerDetail,
  SpeakerDetailDashboard
} from 'types/directory'
import { actions } from './constants'
import { initialState } from './context'

export const useActions = (
  state: DirectoryContextState,
  dispatch
): DirectoryActions => {
  const { actions: actionsDates } = useDatesFilter()

  const getDirectoryService = useApi({
    endpoint: 'list-info-pins',
    method: 'get'
  })

  const getPinInfoService = useApi({
    endpoint: 'info-pin',
    method: 'get'
  })

  const getActivityCallService = useApi({
    endpoint: 'time-series-speaker',
    method: 'get',
    base: 'analysis'
  })

  const getPercentageAlertService = useApi({
    endpoint: 'percent-alert',
    method: 'get',
    base: 'analysis'
  })

  const getHistoryOfCallService = useApi({
    endpoint: 'radar-call',
    method: 'get',
    base: 'analysis'
  })

  const getListOfCallService = useApi({
    endpoint: 'calls-by-pin',
    method: 'get'
  })

  const createSpeakerService = useApi({
    endpoint: 'speaker',
    method: 'post'
  })

  const getPinInfo = async (filters: PinFilters): Promise<SpeakerDetail> => {
    try {
      const res: any = await getPinInfoService({
        urlParams: filters
      })

      if (res.data) {
        return res.data
      }
      return null as any
    } catch (error) {
      return null as any
    }
  }

  const getActivityCall = async (filters: PinFilters): Promise<Charts> => {
    try {
      const res: any = await getActivityCallService({
        urlParams: filters
      })

      if (res.data) {
        const callChartWithType = res.data.calls.map((call) => ({
          ...call,
          type: 'calls'
        }))
        const alertChartWithType = res.data.alert.map((alert) => ({
          ...alert,
          type: 'alerts'
        }))

        return {
          alerts: alertChartWithType,
          calls: callChartWithType
        }
      }
      return {
        alerts: [],
        calls: []
      }
    } catch (error) {
      return {
        alerts: [],
        calls: []
      }
    }
  }

  const getPercentageAlert = async (filters: PinFilters): Promise<number> => {
    try {
      const data: any = await getPercentageAlertService({
        urlParams: filters
      })

      if (data.data) {
        return data.data
      }
      return 0
    } catch (error) {
      return 0
    }
  }

  const getHistoryOfCall = async (
    filters: PinFilters
  ): Promise<HistoryCall[]> => {
    try {
      const res: any = await getHistoryOfCallService({
        urlParams: filters
      })

      if (res.data) {
        return res.data
      }
      return []
    } catch (error) {
      return []
    }
  }

  const getListOfCall = async (filters: PinFilters): Promise<CallModel[]> => {
    try {
      const res: any = await getListOfCallService({
        urlParams: filters
      })

      if (res.data) {
        return res.data
      }
      return []
    } catch (error) {
      return []
    }
  }

  const getSpeakerList = async (): Promise<boolean> => {
    try {
      const res: any = await getDirectoryService()

      if (res.data) {
        dispatch(actions.setSpeakerList(res.data))
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  const getSpeakerDashboard = async (filters: PinFilters): Promise<boolean> => {
    try {
      const profile = await getPinInfo(filters)
      const callAlertChart = await getActivityCall(filters)
      const alertPercentage = await getPercentageAlert(filters)
      const historyOfCall = await getHistoryOfCall(filters)
      const listOfCall = await getListOfCall(filters)

      const detail: SpeakerDetailDashboard = {
        profile,
        callAlertChart,
        alertPercentage,
        historyOfCall,
        listOfCall
      }

      dispatch(actions.setSpeakerDashboard(detail))

      return true
    } catch {
      return false
    }
  }

  const createSpeaker = async (speaker: any): Promise<boolean> => {
    try {
      const res: any = await createSpeakerService({ body: speaker })

      if (res.data) {
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  const cleanDashboard = (): void => {
    dispatch(actions.setSpeakerDashboard(initialState.speakerDashboard))
  }

  const setDates = async (
    pinId: string,
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

      if (pinId) {
        await getSpeakerDashboard({ ...dates, pin_id: pinId })
      }
      actionsDates?.setForm(newDates)
    } catch {}
  }

  return {
    getSpeakerList,
    getSpeakerDashboard,
    cleanDashboard,
    createSpeaker,
    setDates
  }
}
