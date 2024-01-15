import useApi from 'hooks/useApi'
import {
  LiveCall,
  LiveCallActions,
  LiveCallPaginationParams,
  LiveCallState,
  StaticFilter
} from './types'
import { SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import { Params } from 'utils/ParamsBuilder'
import { actions } from './constants'
import { CallEvidenceForSocket } from 'context/LiveCallSocket'
import { DocumentType } from 'types/utils'
import useDownloadFile from 'hooks/useDownloadFile'
import { format } from 'date-fns'

const orderByMapper = {
  target: 'target_phone',
  date: 'call_start_date',
  time: 'call_start_date',
  technique: 'technique.name',
  priority: 'technique.priority'
}

export const useActions = (state: LiveCallState, dispatch): LiveCallActions => {
  const {
    pagination,
    dateFilter,
    searchFilter,
    staticFilter,
    data,
    total,
    totalHanged
  } = state
  const getLiveCalls = useApi({
    endpoint: 'call-evidences/monitor',
    method: 'get'
  })
  const hangUpService = useApi({
    endpoint: 'call-evidences',
    method: 'post'
  })
  const exportCallsService = useDownloadFile({
    endpoint: 'exports/call-evidences/monitor',
    method: 'get'
  })

  /**
   * @deprecated
   * @param params
   * @param getTotalRows
   */
  const getData = async (
    params?: LiveCallPaginationParams &
      SearchParams &
      DateFilter &
      StaticFilter,
    getTotalRows?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params, 'call_start_date')
        .pagination(pagination)
        .searchFilters(searchFilter)
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .putStaticFilter('priority', params?.priority)
        .putStaticFilter('type', params?.callType)
        .build()

      const [response, total] = await Promise.all([
        getLiveCalls({ urlParams }),
        getTotalRows ? getTotalCounter() : Promise.resolve(null)
      ])

      dispatch(
        actions.setData(
          (response.data as any[]).map<LiveCall>((datum) => ({
            id: datum.id,
            target: datum.target_phone,
            carrier: datum.carrier,
            date: datum.call_start_date,
            priority: datum.technique?.priority ?? '',
            status: datum.type.includes('live') ? 'live' : 'ended',
            technique: datum.technique?.name,
            type: datum.type.split('_')[0]
          }))
        )
      )
      if (total != null) {
        dispatch(actions.setTotal(total))
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
            callType: params?.callType ?? staticFilter.callType,
            status: params?.status ?? staticFilter.status
          }
        })
      )
    } catch {}
  }

  const getAllData = async (): Promise<void> => {
    try {
      const response = await getLiveCalls({
        urlParams: { limit: -1, by: 'call_start_date', order: 'desc' }
      })
      let totalLive = 0
      let totalHanged = 0
      const calls = (response.data as any[]).map<LiveCall>((datum) => {
        let status = 'ended'
        if (datum.type.includes('live')) {
          status = 'live'
          totalLive++
        } else {
          totalHanged++
        }
        return {
          id: datum.id,
          target: datum.target_phone,
          carrier: datum.carrier,
          date: datum.call_start_date,
          priority: datum.technique?.priority ?? '',
          technique: datum.technique?.name,
          endedAt: datum.call_end_date,
          type: datum.type.split('_')[0],
          status
        }
      })

      dispatch(actions.setData(calls))

      dispatch(actions.setTotal(totalLive))
      dispatch(actions.setTotalHanged(totalHanged))
    } catch {}
  }

  const getTotalCounter = async (): Promise<number | null> => {
    try {
      const response = await getLiveCalls({ urlParams: { page: 1, limit: 1 } })
      return response.size
    } catch {
      return null
    }
  }

  const addLiveCall = (call: CallEvidenceForSocket): void => {
    try {
      const calls: LiveCall[] = [
        {
          id: call.id,
          target: call.target_phone,
          carrier: call.carrier,
          date: call.call_start_date,
          priority: call.technique?.priority ?? '',
          status: call.type.includes('live') ? 'live' : 'ended',
          technique: call.technique?.name,
          endedAt: call.call_end_date,
          type: call.type.split('_')[0]
        },
        ...data
      ]
      dispatch(actions.setData(calls))
      dispatch(actions.setTotal(total + 1))
    } catch {}
  }

  const updateLiveCall = (call: CallEvidenceForSocket): void => {
    try {
      let totalLive = 0
      let totalHanged = 0

      const calls: LiveCall[] = data.map((datum) => {
        let status = 'ended'
        if (call.type.includes('live')) {
          status = 'live'
          totalLive++
        } else totalHanged++

        return datum.id === call.id
          ? {
              id: call.id,
              target: call.target_phone,
              carrier: call.carrier,
              date: call.call_start_date,
              priority: call.technique?.priority ?? '',
              status,
              technique: call.technique?.name,
              endedAt: call.call_end_date,
              type: call.type.split('_')[0]
            }
          : datum
      })
      dispatch(actions.setData(calls))
      dispatch(actions.setTotal(totalLive))
      dispatch(actions.setTotalHanged(totalHanged))
    } catch {}
  }

  const removeLiveCall = (id: string): void => {
    try {
      const calls = data.filter((datum) => datum.id !== id)
      dispatch(actions.setData(calls))
      dispatch(actions.setTotalHanged(totalHanged - 1))
    } catch {}
  }

  const hangUp = async (id: string): Promise<boolean> => {
    try {
      const response = await hangUpService({
        queryString: `${id}/hangup`
      })
      return response.data.success
    } catch {
      return false
    }
  }

  const exportTable = async (document: DocumentType): Promise<void> => {
    try {
      await exportCallsService(
        `live_calls_${format(new Date(), 'ddMMyyyy_HHmmss')}`,
        { urlParams: { limit: -1, export_type: document } }
      )
    } catch {}
  }

  return {
    getData,
    getAllData,
    addLiveCall,
    updateLiveCall,
    removeLiveCall,
    hangUp,
    exportTable
  }
}
