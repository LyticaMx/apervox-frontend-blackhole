import { useDatesFilter } from 'context/DatesFilter'
import { format, subHours } from 'date-fns'
import useApi from 'hooks/useApi'
import {
  Alert,
  AlertContextActions,
  AlertContextState,
  CallAlertSearchParams
} from 'types/alert'
import { PaginationParams, ResponseData } from 'types/api'
import { DatesFilterForm } from 'types/datesFilter'
import { DateFilter } from 'types/filters'
import { actions } from './constants'

const orderByMapper = {
  hour: 'date_call',
  date: 'date_call',
  receiver: 'reception_number'
}

export const useActions = (
  state: AlertContextState,
  dispatch
): AlertContextActions => {
  const { dates, actions: actionsDates } = useDatesFilter()
  const { alertsPagination, callsPagination, currentAlert } = state
  const getAlertsService = useApi({ endpoint: 'alert', method: 'get' })
  const getCallsAlertsService = useApi({
    endpoint: 'alert/calls-by-alert',
    method: 'get'
  })
  const createAlertService = useApi({ endpoint: 'alert', method: 'post' })
  const updateAlertService = useApi({ endpoint: 'alert', method: 'put' })
  const deleteAlertService = useApi({ endpoint: 'alert', method: 'delete' })
  const getTimeSeriesService = useApi({
    endpoint: 'alert/time-serie-alert',
    method: 'get'
  })

  const categories = {
    DURATION: 'Duración',
    HOUR: 'Hora',
    SIMILARITY: 'Similitud',
    CONTENT: 'Contenido'
  }

  const condition = {
    GREAT_THAN: '>',
    GREAT_EQUAL: '>=',
    LESS_THAN: '<',
    LESS_EQUAL: '<=',
    EQUAL: '=',
    NOT: '!=',
    IN: 'en'
  }

  const getAlerts = async (params?: PaginationParams): Promise<void> => {
    try {
      const response: ResponseData = await getAlertsService({
        urlParams: {
          page: alertsPagination.page,
          limit: alertsPagination.limit,
          ...params
        }
      })

      dispatch(
        actions.setAlerts(
          response.data.map((alert) => ({
            id: alert.id,
            category: categories[alert.category],
            condition: `${String(condition[alert.operator])} ${String(
              alert.value
            )}`,
            incidences: 0, // Aun no lo envían
            active: alert.is_active
          }))
        )
      )

      dispatch(
        actions.setAlertsPagination({
          page: response.page_info.current_page,
          limit: params?.limit ?? alertsPagination.limit,
          totalRecords: response.page_info.total_records
        })
      )
    } catch {}
  }

  const getCallAlerts = async (
    params?: CallAlertSearchParams & DateFilter
  ): Promise<void> => {
    try {
      if (currentAlert.id === '') return
      const sort = {
        order_by: 'date_call',
        order: 'desc'
      }

      if (params?.sort) {
        if (params.sort.length > 0) {
          const [sortBy] = params.sort
          sort.order_by = orderByMapper[sortBy.id] ?? sortBy.id
          sort.order = sortBy.desc ? 'desc' : 'asc'
        }
      }

      const response: ResponseData = await getCallsAlertsService({
        urlParams: {
          ...sort,
          id: currentAlert.id,
          page: params?.page,
          limit: params?.limit,
          start_time: params?.start_time ?? dates.start_time,
          end_time: params?.end_time ?? dates.end_time
        }
      })

      dispatch(
        actions.setCallAlerts(
          response.data.map((call) => ({
            date: format(new Date(call.date_call), 'dd/MM/yyyy'),
            hour: format(new Date(call.date_call), 'HH:mm:ss'),
            pin: call.pin,
            receiver: call.reception_number,
            duration: call.duration,
            id: call.id
          }))
        )
      )

      dispatch(
        actions.setCallAlertsPagination({
          page: response.page_info.current_page,
          limit: params?.limit ?? callsPagination.limit,
          totalRecords: response.page_info.total_records,
          sort: params?.sort ?? callsPagination.sort
        })
      )
    } catch {}
  }

  const getStatistics = async (params?: DateFilter): Promise<boolean> => {
    try {
      if (currentAlert.id === '') return true
      const response = await getTimeSeriesService({
        urlParams: {
          id: currentAlert.id,
          start_time: params?.start_time ?? dates.start_time,
          end_time: params?.end_time ?? dates.end_time
        }
      })

      dispatch(
        actions.setAlertTimeSeries(
          response?.data?.calls?.map((alert) => ({
            ...alert,
            type: 'alerts'
          })) ?? []
        )
      )
      return true
    } catch {
      return false
    }
  }

  const createAlert = async (
    category: string,
    operator: string,
    value: string
  ): Promise<boolean> => {
    try {
      await createAlertService({
        body: {
          category,
          operator,
          value
        }
      })

      return true
    } catch {
      return false
    }
  }

  const updateAlert = async (id: string, active: boolean): Promise<boolean> => {
    try {
      await updateAlertService({
        urlParams: { id },
        body: {
          is_active: active
        }
      })

      return true
    } catch {
      return false
    }
  }

  const deleteAlert = async (id: string): Promise<boolean> => {
    try {
      await deleteAlertService({ queryString: id })

      return true
    } catch {
      return false
    }
  }

  const setCurrentAlert = (alert: Alert): void => {
    dispatch(actions.setCurrentAlert(alert))
  }

  const getAll = async (params?: DateFilter): Promise<boolean> => {
    try {
      const fetch = [getCallAlerts(params), getStatistics(params)]
      const results = await Promise.all(fetch)
      return results.every((res) => res)
    } catch {
      return false
    }
  }

  const setGlobalFilters = async (params?: DatesFilterForm): Promise<void> => {
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

  return {
    createAlert,
    deleteAlert,
    getAlerts,
    getCallAlerts,
    getStatistics,
    updateAlert,
    setCurrentAlert,
    setGlobalFilters
  }
}
