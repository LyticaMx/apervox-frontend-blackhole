import { SearchParams } from 'types/api'
import { actions } from './constants'
import {
  GroupAudit,
  GroupAuditActions,
  GroupAuditContextState,
  GroupAuditPaginationParams
} from './types'
import { DateFilter } from 'types/filters'
import { Params } from 'utils/ParamsBuilder'
import useApi from 'hooks/useApi'

const orderByMapper = {}

export const useActions = (
  state: GroupAuditContextState,
  dispatch
): GroupAuditActions => {
  const { id, dateFilter, pagination, searchFilter } = state

  const getAudits = useApi({ endpoint: 'audits', method: 'get' })

  const setGroupId = (groupId?: string): void => {
    dispatch(actions.setGroupID(groupId))
  }

  const getData = async (
    params?: GroupAuditPaginationParams & SearchParams & DateFilter,
    getTotal: boolean = false
  ): Promise<void> => {
    try {
      if (!id) return
      const urlParams = Params.Builder(params)
        .pagination(pagination)
        .searchFilters(searchFilter)
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .putStaticFilter('model_id', id)
        .build()

      const [response, total] = await Promise.all([
        getAudits({ urlParams }),
        getTotal
          ? getAudits({ urlParams: { ...urlParams, page: 1, limit: 1 } })
              .then((res) => res.size)
              .catch(() => null)
          : Promise.resolve(null)
      ])

      dispatch(
        actions.setData(
          (response.data as any[]).map<GroupAudit>((datum) => ({
            id: datum.id,
            action: datum.action,
            createdAt: datum.created_at,
            name: datum.name,
            userId: datum?.user?.id ?? '',
            username: datum?.user?.username ?? '',
            newData: datum.new,
            oldData: datum.old
          }))
        )
      )

      if (total !== null) dispatch(actions.setTotal(total))

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
          }
        })
      )
    } catch {}
  }

  return { setGroupId, getData }
}
