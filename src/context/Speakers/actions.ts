import { DateFilter } from 'types/filters'
import { initialState } from './context'
import { useServices } from './services'

import { actions } from './constants'
import {
  Actions,
  CallsParams,
  Heatmap,
  ListPinsParams,
  State
} from 'types/speaker'
import { DatesFilterForm } from 'types/datesFilter'
import { subHours } from 'date-fns'
import { useDatesFilter } from 'context/DatesFilter'

const useActions = (state: State, dispatch): Actions => {
  const services = useServices()
  const { actions: actionsDates, dates } = useDatesFilter()

  const getAll = async (params?: DateFilter): Promise<boolean> => {
    try {
      const fetch = [
        getSummary(params),
        getHistogram(params),
        getListPins({ ...params, page: 1 }),
        getHeatmapSpeakers(params),
        getHeatmapAlerts(params),
        getCallsByAlerts({ ...params, page: 1 })
      ]
      const results = await Promise.all(fetch)

      return results.every((res) => res)
    } catch (error) {
      return false
    }
  }

  const setDates = async (payload: DatesFilterForm): Promise<void> => {
    try {
      let startTime = payload?.start_time ?? dates.start_time
      if (payload?.time) {
        startTime = subHours(new Date(), payload.time)
      }

      const newDates = {
        ...payload,
        start_time: startTime
      }

      await getAll(newDates)
      actionsDates?.setForm(payload)
    } catch {}
  }

  const getSummary = async (params?: DateFilter): Promise<boolean> => {
    try {
      const data = await services.getSummaryService({
        urlParams: { ...dates, ...params }
      })

      if (data.data) {
        const ns = data.data
        dispatch(
          actions.setSummary({
            totalPins: ns.total_pins,
            pinAlerts: ns.pin_alerts,
            average: {
              ...ns.average,
              current: Number(ns.average.current.toFixed(2)),
              last: Number(ns.average.last.toFixed(2))
            }
          })
        )
      } else {
        dispatch(actions.setSummary(initialState.summary))
      }

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setSummary(initialState.summary))
      return false
    }
  }

  const getHistogram = async (params?: DateFilter): Promise<boolean> => {
    try {
      const data = await services.getHistogramService({
        urlParams: {
          ...dates,
          ...params
        }
      })

      dispatch(actions.setHistogram(data.data ?? initialState.histogram))

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setHistogram(initialState.histogram))
      return false
    }
  }

  const getListPins = async (params?: ListPinsParams): Promise<boolean> => {
    try {
      const range = {
        min_value: params?.min_value ?? state.pinsPagination.min_value,
        max_value: params?.max_value ?? state.pinsPagination.max_value
      }

      const data = await services.getListPinsService({
        urlParams: {
          ...dates,
          page: state.pinsPagination.page,
          limit: state.pinsPagination.limit,
          ...params,
          ...(range.max_value ? range : {})
        }
      })

      dispatch(actions.setPins(data.data ?? initialState.pins))
      dispatch(
        actions.setPinsPagination({
          page: data.page_info.current_page,
          limit: params?.limit ?? state.pinsPagination.limit,
          totalRecords: data.page_info.total_records,
          ...range
        })
      )

      return Boolean(data.data)
    } catch (error) {
      return false
    }
  }

  const getHeatmapSpeakers = async (params?: DateFilter): Promise<boolean> => {
    try {
      const data = await services.getHeatmapSpeakersService({
        urlParams: {
          ...dates,
          ...params
        }
      })

      if (data.data) {
        dispatch(
          actions.setHeatmapSpeakers(
            data.data.map((item: Heatmap) => ({
              ...item,
              y: item.y.toString(),
              x: item.x.toString()
            }))
          )
        )
      }

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setHeatmapSpeakers(initialState.heatmapSpeakers))

      return false
    }
  }

  const getHeatmapAlerts = async (params?: DateFilter): Promise<boolean> => {
    try {
      const data = await services.getHeatmapAlertsService({
        urlParams: {
          ...dates,
          ...params
        }
      })

      if (data.data) {
        dispatch(
          actions.setHeatmapAlerts(
            data.data.map((item: Heatmap) => ({
              ...item,
              y: item.y.toString(),
              x: item.x.toString()
            }))
          )
        )
      }

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setHeatmapAlerts(initialState.heatmapAlerts))

      return false
    }
  }

  const getCallsByAlerts = async (params?: CallsParams): Promise<boolean> => {
    try {
      const data = await services.getCallsByAlertsService({
        urlParams: {
          ...dates,
          page: state.callsPagination.page,
          limit: state.callsPagination.limit,
          ...params,
          calls: params?.calls ?? state.callsPagination.calls,
          order_by: params?.order_by ?? state.callsPagination.order_by
        }
      })

      dispatch(actions.setCalls(data.data ?? initialState.calls))
      dispatch(
        actions.setCallsPagination({
          page: data.page_info.current_page,
          limit: params?.limit ?? state.callsPagination.limit,
          totalRecords: data.page_info.total_records,
          calls: params?.calls ?? state.callsPagination.calls,
          order_by: params?.order_by ?? state.callsPagination.order_by
        })
      )

      return Boolean(data)
    } catch (error) {
      dispatch(actions.setCalls(initialState.calls))

      return false
    }
  }

  return {
    getAll,
    getSummary,
    getHistogram,
    getListPins,
    getHeatmapSpeakers,
    getHeatmapAlerts,
    getCallsByAlerts,
    setDates
  }
}

export { useActions }
