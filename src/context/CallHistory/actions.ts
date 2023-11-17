import useApi from 'hooks/useApi'
import {
  Call,
  CallActions,
  CallPaginationParams,
  CallState,
  ClassificationCounters,
  StaticFilter
} from './types'
import { ResponseData, SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import { Params } from 'utils/ParamsBuilder'
import { actions } from './constants'
import mutexify from 'mutexify/promise'
import { DocumentType, RowsQuantity } from 'types/utils'
import useDownloadFile from 'hooks/useDownloadFile'
import { format } from 'date-fns'

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
  const exportCallHistory = useDownloadFile({
    endpoint: 'exports/call-evidences/monitor/history',
    method: 'get'
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

      const apiCalls: [
        Promise<ResponseData>,
        ...Array<Promise<number | null>>
      ] = [getHistory({ urlParams })]
      if (getTotalRows) {
        apiCalls.push(
          getHistory({ urlParams: { ...urlParams, page: 1, limit: 1 } })
            .then((res) => res.size)
            .catch(() => null),
          getHistory({
            urlParams: {
              ...urlParams,
              page: 1,
              limit: 1,
              relevance: ['unclassified']
            }
          })
            .then((res) => res.size)
            .catch(() => null),
          getHistory({
            urlParams: {
              ...urlParams,
              page: 1,
              limit: 1,
              relevance: ['not_relevant']
            }
          })
            .then((res) => res.size)
            .catch(() => null),
          getHistory({
            urlParams: {
              ...urlParams,
              page: 1,
              limit: 1,
              relevance: ['relevant']
            }
          })
            .then((res) => res.size)
            .catch(() => null),
          getHistory({
            urlParams: {
              ...urlParams,
              page: 1,
              limit: 1,
              has_transcription: true
            }
          })
            .then((res) => res.size)
            .catch(() => null)
        )
      }

      const [
        response,
        total,
        unclassified,
        notRelevant,
        relevant,
        withTranscription
      ] = await Promise.all(apiCalls)

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

      if (getTotalRows) {
        if (total != null) dispatch(actions.setTotal(total))
        const counters: ClassificationCounters = {
          notRelevant: 0,
          relevant: 0,
          unclassified: 0,
          withTranscription: 0
        }
        if (unclassified != null) counters.unclassified = unclassified
        if (notRelevant != null) counters.notRelevant = notRelevant
        if (relevant != null) counters.relevant = relevant
        if (withTranscription != null) {
          counters.withTranscription = withTranscription
        }

        dispatch(actions.setCounters(counters))
      }

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

  const exportTable = async (
    document: DocumentType,
    quantity: RowsQuantity
  ): Promise<void> => {
    try {
      const params = quantity === 'full' ? { limit: -1 } : {}
      const urlParams = Params.Builder(params, 'call_start_date')
        .pagination(pagination)
        .searchFilters(searchFilter)
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .putStaticFilter('priority', staticFilter?.priority)
        .putStaticFilter('relevance', staticFilter?.relevance)
        .putStaticFilter('type', staticFilter?.type)
        .putStaticFilter(
          'has_transcription',
          staticFilter?.hasTranscription?.[0] === 'withTranscription'
            ? true
            : staticFilter?.hasTranscription?.[0] === 'withoutTranscription'
            ? false
            : undefined
        )
        .putStaticFilter('export_type', document)
        .build()

      await exportCallHistory(
        `call_history_${format(new Date(), 'ddMMyyyy_HHmmss')}`,
        { urlParams }
      )
    } catch (e) {
      console.error(e)
    }
  }

  return {
    getData,
    classify,
    updateEvidence,
    exportTable
  }
}
