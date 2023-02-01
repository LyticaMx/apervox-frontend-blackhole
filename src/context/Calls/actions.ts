import { useDatesFilter } from 'context/DatesFilter'
import { subHours } from 'date-fns'
import useApi from 'hooks/useApi'
import { ResponseData } from 'types/api'
import {
  DashboardCallActions,
  CallContextState,
  ListOfCallFilter,
  PinsParams
} from 'types/call'
import { DatesFilterForm } from 'types/datesFilter'
import { DateFilter } from 'types/filters'
import { actions } from './constants'
import { initialState } from './context'

export const useActions = (
  state: CallContextState,
  dispatch
): DashboardCallActions => {
  const { callsPagination, pinsPagination } = state
  const { dates, actions: actionsDates } = useDatesFilter()

  const getCallsService = useApi({
    endpoint: 'calls-by-range',
    method: 'get'
  })
  const getPinsService = useApi({
    endpoint: 'list-pins',
    method: 'get',
    base: 'analysis'
  })
  const getCountsService = useApi({
    endpoint: 'summary-call',
    method: 'get',
    base: 'analysis'
  })
  const getChartsService = useApi({
    endpoint: 'time-series',
    method: 'get',
    base: 'analysis'
  })
  const playCallApi = useApi({
    endpoint: '/call',
    method: 'get'
  })

  const getListOfCalls = async (filters?: ListOfCallFilter): Promise<void> => {
    try {
      let pin
      if (filters?.pin_number) pin = filters.pin_number

      const response: ResponseData = await getCallsService({
        urlParams: {
          page: callsPagination.page,
          limit: callsPagination.limit,
          order_by: callsPagination.orderBy,
          calls: callsPagination.calls,
          start_time: dates.start_time,
          end_time: dates.end_time,
          ...filters,
          pin
        }
      })
      if (response.data) {
        dispatch(actions.setCalls(response.data))
        dispatch(
          actions.setCallsPagination({
            page: response.page_info.current_page,
            limit: filters?.limit ?? callsPagination.limit,
            totalRecords: response.page_info.total_records,
            orderBy: filters?.order_by ?? callsPagination.orderBy,
            calls: filters?.calls ?? callsPagination.calls,
            pin_number: filters?.pin_number ?? null
          })
        )
      } else {
        dispatch(actions.setCalls(initialState.listOfCalls))
        dispatch(actions.setCallsPagination(initialState.callsPagination))
      }
    } catch {}
  }

  const getListOfPins = async (params?: PinsParams): Promise<void> => {
    try {
      const response: ResponseData = await getPinsService({
        urlParams: {
          start_time: dates.start_time,
          end_time: dates.end_time,
          limit: pinsPagination.limit,
          page: pinsPagination.page,
          ...params
        }
      })

      if (response.data) {
        dispatch(actions.setPins(response.data))
        dispatch(
          actions.setPinsPagination({
            page: response.page_info.current_page,
            limit: params?.limit ?? pinsPagination.limit,
            totalRecords: response.page_info.total_records ?? 0
          })
        )
      } else {
        dispatch(actions.setPins([]))
        dispatch(actions.setPinsPagination(initialState.pinsPagination))
      }
    } catch {}
  }

  const getCounts = async (filters?: DateFilter): Promise<boolean> => {
    try {
      const response: ResponseData = await getCountsService({
        urlParams: {
          start_time: dates.start_time,
          end_time: dates.end_time,
          ...filters
        }
      })

      if (response.data) {
        dispatch(actions.setCallCounts(response.data))
        return true
      } else {
        dispatch(actions.setCallCounts(initialState.counts))
        return false
      }
    } catch {
      dispatch(actions.setCallCounts(initialState.counts))
      return false
    }
  }

  const getCharts = async (filters?: DateFilter): Promise<boolean> => {
    try {
      const response: ResponseData = await getChartsService({
        urlParams: {
          start_time: dates.start_time,
          end_time: dates.end_time,
          ...filters
        }
      })

      if (response.data) {
        const callChartWithType = response.data.calls.map((call) => ({
          ...call,
          type: 'calls'
        }))
        const alertChartWithType = response.data.alert.map((alert) => ({
          ...alert,
          type: 'alerts'
        }))

        dispatch(
          actions.setCallCharts({
            alerts: alertChartWithType,
            calls: callChartWithType
          })
        )
        return true
      } else {
        dispatch(actions.setCallCharts(initialState.charts))
        return false
      }
    } catch {
      dispatch(actions.setCallCharts(initialState.charts))
      return false
    }
  }

  const getStatistics = async (filters?: DateFilter): Promise<boolean> => {
    try {
      const fetch = [getCounts(filters), getCharts(filters)]
      const results = await Promise.all(fetch)

      return results.every((res) => res)
    } catch {
      return false
    }
  }

  const getAll = async (params?: DateFilter): Promise<boolean> => {
    try {
      const fetch = [
        getListOfCalls({ ...params, page: 1 }),
        getListOfPins({ ...params, page: 1 }),
        getStatistics(params)
      ]
      const results = await Promise.all(fetch)
      return results.every((res) => res)
    } catch {
      return false
    }
  }

  const setGlobalFilters = async (params: DatesFilterForm): Promise<void> => {
    try {
      let startTime = params?.start_time ?? dates.start_time
      if (params?.time) {
        startTime = subHours(new Date(), params.time)
      }

      const newDates = {
        ...params,
        start_time: startTime
      }

      await getAll(newDates)
      actionsDates?.setForm(params)
    } catch {}
  }

  const playCall = async (
    id: string,
    type: string = 'full'
  ): Promise<any> => {
    try {
      const res = await playCallApi({
        queryString: `${id}/stream-${type}`,
        urlParams: {
          auth_token: localStorage.getItem('token')
        }
      })

      if (res) {
        return `${
          process.env.REACT_APP_MAIN_BACKEND_URL
        }call/${id}/stream-${type}?auth_token=${localStorage.getItem('token')}`
      }
      return false
    } catch (error) {
      return false
    }
  }

  return {
    getListOfCalls,
    getStatistics,
    getListOfPins,
    getAll,
    setGlobalFilters,
    playCall
  }
}
