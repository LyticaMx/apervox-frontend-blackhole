import { useDatesFilter } from 'context/DatesFilter'
import { format, subHours } from 'date-fns'
import useApi from 'hooks/useApi'
import { PaginationParams } from 'types/api'
import {
  CallsParams,
  Case,
  CaseContextActions,
  CaseContextState,
  GetAllParams
} from 'types/case'
import { DatesFilterForm } from 'types/datesFilter'
import { DateFilter } from 'types/filters'
import { actions } from './constants'

const orderByMapper = {
  date: 'date_call',
  receiver: 'reception_number'
}

export const useActions = (
  state: CaseContextState,
  dispatch
): CaseContextActions => {
  const {
    activeCasesPagination,
    archivedCasesPagination,
    caseDetail,
    listOfActiveCases
  } = state
  const { dates, actions: actionsDates } = useDatesFilter()

  const getSummaryService = useApi({ endpoint: 'case/stats', method: 'get' })
  const getCasesService = useApi({ endpoint: 'case', method: 'get' })
  const createCaseService = useApi({ endpoint: 'case', method: 'post' })
  const updateCaseService = useApi({ endpoint: 'case', method: 'put' })

  const getActiveCases = async (
    params?: PaginationParams & DateFilter
  ): Promise<void> => {
    try {
      const response = await getCasesService({
        urlParams: {
          page: activeCasesPagination.page,
          limit: activeCasesPagination.limit,
          start_time: dates.start_time,
          end_time: dates.end_time,
          ...params
        }
      })

      dispatch(
        actions.setActiveCases(
          response.data.map((item) => ({
            id: item.id,
            name: item.name,
            users: item.users.map((user) => ({
              id: user.id,
              fullName: user.full_name,
              email: user.email
            })),
            pins: item.pins.map((pin) => ({
              ...pin,
              email: pin?.added_by?.email ?? 'user@apervox.com'
            })),
            createdBy: item?.created_by?.full_name ?? 'Apervox user'
          }))
        )
      )

      dispatch(
        actions.setActiveCasesPagination({
          page: response.page_info.current_page,
          limit: params?.limit ?? activeCasesPagination.limit,
          totalRecords: response.page_info.total_records
        })
      )
    } catch {}
  }

  const getArchivedCases = async (
    params?: PaginationParams & DateFilter
  ): Promise<void> => {
    try {
      const response = await getCasesService({
        urlParams: {
          page: archivedCasesPagination.page,
          limit: archivedCasesPagination.limit,
          start_time: dates.start_time,
          end_time: dates.end_time,
          ...params,
          is_active: false
        }
      })

      dispatch(
        actions.setArchivedCases(
          response.data.map((item) => ({
            id: item.id,
            name: item.name,
            usersCount: item.users.length,
            pins: item.pins.length,
            createdBy: item?.created_by?.full_name ?? 'Apervox user'
          }))
        )
      )

      dispatch(
        actions.setArchivedCasesPagination({
          page: response.page_info.current_page,
          limit: params?.limit ?? archivedCasesPagination.limit,
          totalRecords: response.page_info.total_records
        })
      )
    } catch {}
  }

  const getCalls = async (params?: CallsParams & DateFilter): Promise<void> => {
    if (caseDetail.id === '') return
    try {
      const alert =
        params?.alert === 1 ? false : params?.alert === 2 ? true : undefined

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

      const response = await getCasesService({
        queryString: `${caseDetail.id}/calls-by-case`,
        urlParams: {
          ...sort,
          start_time: params?.start_time ?? dates.start_time,
          end_time: params?.end_time ?? dates.end_time,
          page: params?.page,
          limit: params?.limit,
          alert
        }
      })

      dispatch(
        actions.setCaseCalls(
          response.data.map((call) => {
            const date = new Date(call.date_call)

            return {
              id: call.id,
              date: format(date, 'dd/MM/yyyy'),
              hour: format(date, 'HH:mm:ss'),
              pin: call.pin,
              receiver: call.reception_number,
              duration: call.duration,
              notification: call.alert
            }
          })
        )
      )
      dispatch(
        actions.setCaseCallsPagination({
          page: response.page_info.current_page,
          limit: params?.limit ?? caseDetail.callsPagination.limit,
          totalRecords: response.page_info.total_records,
          sort: params?.sort ?? caseDetail.callsPagination.sort,
          alert: params?.alert ?? caseDetail.callsPagination.alert
        })
      )
    } catch {}
  }

  const getFrequentNumbers = async (params?: DateFilter): Promise<void> => {
    try {
      if (caseDetail.id === '') return
      const response = await getCasesService({
        queryString: `${String(caseDetail.id)}/frequent-calls`,
        urlParams: {
          start_time: params?.start_time ?? dates.start_time,
          end_time: params?.end_time ?? dates.end_time
        }
      })

      dispatch(
        actions.setFrequentNumbers(
          response.data.map((item) => ({
            item: item.reception_number,
            score: item.frequency
          }))
        )
      )
    } catch {}
  }

  const getSummary = async (params?: DateFilter): Promise<void> => {
    try {
      const response = await getSummaryService({
        urlParams: {
          start_time: params?.start_time ?? dates.start_time,
          end_time: params?.end_time ?? dates.end_time
        }
      })
      const {
        data: { cases, pins, alerts }
      } = response
      dispatch(
        actions.setSummary({
          totalCases: {
            current: cases.now,
            last: cases.before
          },
          pinsInCases: {
            current: pins.now,
            last: pins.before
          },
          alertsInCases: {
            current: alerts.now,
            last: alerts.before
          }
        })
      )
    } catch {}
  }

  const createCase = async (
    name: string,
    users: string[],
    pins: string[]
  ): Promise<boolean> => {
    try {
      await createCaseService({
        body: {
          name,
          users,
          pins
        }
      })

      return true
    } catch {
      return false
    }
  }

  const updateCase = async (
    caseId: string,
    store: boolean,
    name?: string,
    users?: string[],
    pins?: string[]
  ): Promise<boolean> => {
    try {
      const response = await updateCaseService({
        urlParams: { id: caseId },
        body: {
          name,
          users,
          pins,
          is_active: !store
        }
      })

      const updatedCase: Case = {
        id: response.data.id,
        name: response.data.name,
        users: response.data.users.map((user) => ({
          id: user.id,
          fullName: user.full_name,
          email: user.email
        })),
        pins: response.data.pins.map((pin) => ({
          ...pin,
          email: pin?.added_by?.email ?? 'user@apervox.com'
        })),
        createdBy: response.data?.created_by?.full_name ?? 'Apervox user'
      }
      dispatch(
        actions.setActiveCases(
          listOfActiveCases.map((item) =>
            item.id === updatedCase.id ? updatedCase : item
          )
        )
      )
      if (caseDetail.id === updatedCase.id) {
        dispatch(actions.updateCurrentCase(updatedCase))
      }

      return true
    } catch {
      return false
    }
  }

  const linkUser = async (
    userId: string,
    link: boolean = true
  ): Promise<boolean> => {
    try {
      if (!caseDetail) return false
      const response = await updateCaseService({
        queryString: `${caseDetail.id}/link-user`,
        body: {
          id: userId,
          linking: link
        }
      })
      const updatedCase: Case = {
        id: response.data.id,
        name: response.data.name,
        users: response.data.users.map((user) => ({
          id: user.id,
          fullName: user.full_name,
          email: user.email
        })),
        pins: response.data.pins.map((pin) => ({
          ...pin,
          email: pin?.added_by?.email ?? 'user@apervox.com'
        })),
        createdBy: response.data?.created_by?.full_name ?? 'Apervox user'
      }
      dispatch(
        actions.setActiveCases(
          listOfActiveCases.map((item) =>
            item.id === updatedCase.id ? updatedCase : item
          )
        )
      )
      if (caseDetail.id === updatedCase.id) {
        dispatch(actions.updateCurrentCase(updatedCase))
      }
      return true
    } catch {
      return false
    }
  }

  const linkPin = async (pinId: string, link?: boolean): Promise<boolean> => {
    try {
      if (!caseDetail) return false
      const response = await updateCaseService({
        queryString: `${caseDetail.id}/link-pin`,
        body: {
          id: pinId,
          linking: link
        }
      })

      const updatedCase: Case = {
        id: response.data.id,
        name: response.data.name,
        users: response.data.users.map((user) => ({
          id: user.id,
          fullName: user.full_name,
          email: user.email
        })),
        pins: response.data.pins.map((pin) => ({
          ...pin,
          email: pin?.added_by?.email ?? 'user@apervox.com'
        })),
        createdBy: response.data?.created_by?.full_name ?? 'Apervox user'
      }
      dispatch(
        actions.setActiveCases(
          listOfActiveCases.map((item) =>
            item.id === updatedCase.id ? updatedCase : item
          )
        )
      )

      if (caseDetail.id === updatedCase.id) {
        dispatch(actions.updateCurrentCase(updatedCase))
      }

      return true
    } catch {
      return false
    }
  }

  const setCurrentCase = (current: Case): void => {
    dispatch(actions.setCurrentCase(current))
  }

  const getAll = async (params: GetAllParams): Promise<boolean> => {
    try {
      const newParams = {
        start_time: params.start_time,
        end_time: params.end_time,
        page: 1
      }

      const fetch = [
        params.casesType === 'active'
          ? getActiveCases(newParams)
          : getArchivedCases(newParams),
        getSummary({
          start_time: params.start_time,
          end_time: params.end_time
        }),
        getCalls(newParams),
        getFrequentNumbers(newParams)
      ]

      const results = await Promise.all(fetch)
      return results.every((res) => res)
    } catch {
      return false
    }
  }

  const setGlobalFilters = async (
    casesType,
    params: DatesFilterForm
  ): Promise<void> => {
    try {
      let startTime = params?.start_time ?? dates.start_time
      if (params?.time) {
        startTime = subHours(new Date(), params.time)
      }

      const newDates = {
        ...params,
        start_time: startTime
      }

      await getAll({ ...newDates, casesType })
      actionsDates?.setForm(params)
    } catch {}
  }

  return {
    createCase,
    getActiveCases,
    getArchivedCases,
    getCalls,
    getFrequentNumbers,
    getSummary,
    linkPin,
    linkUser,
    setCurrentCase,
    updateCase,
    getAll,
    setGlobalFilters
  }
}
