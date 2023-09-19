import useApi from 'hooks/useApi'
import {
  Call,
  CallActions,
  CallPaginationParams,
  CallState,
  StaticFilter
} from './types'
import { SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import { Params } from 'utils/ParamsBuilder'
import { actions } from './constants'
import mutexify from 'mutexify/promise'

const orderByMapper = {
  source: 'source_number',
  line: 'overflow_line_phone',
  target: 'target_phone',
  date: 'call_start_date',
  time: 'call_start_date',
  technique: 'technique.name',
  priority: 'technique.priority',
  workedBy: 'working_by.username',
  transcription: 'has_transcription'
}

const lock = mutexify()

export const useActions = (state: CallState, dispatch): CallActions => {
  const { pagination, dateFilter, searchFilter, staticFilter, data } = state
  const getHistory = useApi({
    endpoint: 'call-evidences/monitor/history',
    method: 'get'
  })
  const getEvidence = useApi({
    endpoint: 'call-evidences',
    method: 'get'
  })
  const classifyCall = useApi({
    endpoint: 'call-evidences',
    method: 'put'
  })

  const getData = async (
    params?: CallPaginationParams & SearchParams & DateFilter & StaticFilter,
    getTotalRows?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params, 'call_start_date')
        .pagination(pagination)
        .searchFilters(searchFilter)
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .putStaticFilter('priority', params?.priority)
        .putStaticFilter('relevance', params?.relevance)
        .putStaticFilter('type', params?.type)
        .putStaticFilter(
          'has_transcription',
          params?.hasTranscription?.[0] === 'withTranscription'
            ? true
            : params?.hasTranscription?.[0] === 'withoutTranscription'
            ? false
            : undefined
        )
        .build()

      const [response, total] = await Promise.all([
        getHistory({ urlParams }),
        getTotalRows
          ? getHistory({ urlParams: { page: 1, limit: 1 } })
              .then((res) => res.size)
              .catch(() => null)
          : Promise.resolve(null)
      ])

      dispatch(
        actions.setData(
          (response.data as any[]).map<Call>((datum) => {
            const call: Call = {
              id: datum.id,
              carrier: datum.carrier,
              date: datum.call_start_date,
              line: datum.overflow_line_phone,
              priority: datum.technique?.priority ?? '',
              relevance: datum.relevance,
              source: datum.source_number,
              target: datum.target_phone,
              technique: datum.technique?.name ?? '',
              transcription: datum.has_transcription ?? false,
              type: datum.type ?? '',
              workedBy: datum.working_by?.username
            }

            if (datum.label) call.label = datum.label
            else if (datum.other_label) call.otherLabel = datum.other_label

            return call
          })
        )
      )

      if (total != null) dispatch(actions.setTotal(total))

      dispatch(
        actions.setPagination({
          page: response.page,
          limit: params?.limit ?? pagination.limit,
          totalRecords: response.size,
          sort: params?.sort ?? pagination.sort
        })
      )

      dispatch(
        actions.setFilters({
          search: {
            query: params?.query ?? searchFilter.query,
            filters: params?.filters ?? searchFilter.filters
          },
          date: {
            start_time: urlParams.start_time,
            end_time: urlParams.end_time
          },
          static: {
            hasTranscription:
              params?.hasTranscription ?? staticFilter.hasTranscription,
            priority: params?.priority ?? staticFilter.priority,
            relevance: params?.relevance ?? staticFilter.relevance,
            type: params?.type ?? staticFilter.type
          }
        })
      )
    } catch {}
  }

  const classify = async (
    ids: string[],
    relevance: string
  ): Promise<boolean> => {
    try {
      await classifyCall({
        body: {
          ids,
          payload: { relevance }
        }
      })

      return true
    } catch {
      return false
    }
  }

  const updateEvidence = async (id: string): Promise<void> => {
    const release = await lock()
    try {
      const canBeUpdated = data.some((ev) => ev.id === id)

      if (!canBeUpdated) return

      try {
        const response = await getEvidence({ queryString: id })

        dispatch(
          actions.setData(
            data.map((ev) =>
              ev.id === id
                ? { ...ev, workedBy: response.data.working_by?.username ?? '' }
                : ev
            )
          )
        )
      } catch {}
    } finally {
      release()
    }
  }

  return {
    getData,
    classify,
    updateEvidence
  }
}
