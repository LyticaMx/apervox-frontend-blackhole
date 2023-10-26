import useApi from 'hooks/useApi'
import {
  LineEvent,
  LineHistoryActions,
  LineHistoryContextState,
  LineHistoryPaginationParams,
  LineHistoryStaticFilter,
  SelectedLine
} from './types'
import { actions } from './constants'
import { Params } from 'utils/ParamsBuilder'

const orderByMapper = {
  endDate: 'end_date',
  target: 'target.phone',
  technique: 'target.technique.name',
  techniqueStatus: 'target.technique.status',
  techniqueStartDate: 'target.technique.start_date',
  techniqueEndDate: 'target.technique.end_date'
}

export const useActions = (
  state: LineHistoryContextState,
  dispatch
): LineHistoryActions => {
  const { line, pagination, staticFilter } = state

  const getLineHistory = useApi({
    endpoint: 'overflow-lines',
    method: 'get'
  })

  const setLine = (line?: SelectedLine): void => {
    dispatch(actions.setLineID(line))
    if (line) dispatch(actions.setData([]))
  }

  const getData = async (
    params?: LineHistoryPaginationParams & LineHistoryStaticFilter
  ): Promise<void> => {
    try {
      if (!line) return
      const urlParams = Params.Builder(params)
        .pagination(pagination)
        .sort(pagination.sort, orderByMapper)
        .putStaticFilter('status', staticFilter?.status)
        .build()

      const response = await getLineHistory({
        urlParams,
        queryString: `${line.id}/history`
      })

      dispatch(
        actions.setData(
          (response.data as any[]).map<LineEvent>((datum) => ({
            id: datum.id,
            target: datum.target?.phone ?? '',
            endDate: datum.endDate ?? '',
            technique: datum.target?.technique?.name ?? '',
            techniqueStartDate: datum.target?.technique?.start_date ?? '',
            techniqueEndDate: datum.target?.technique?.end_date ?? '',
            techniqueStatus: datum.target?.technique?.status ?? ''
          }))
        )
      )

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
          static: {
            status: params?.status ?? staticFilter.status
          }
        })
      )
    } catch {}
  }

  return {
    getData,
    setLine
  }
}
