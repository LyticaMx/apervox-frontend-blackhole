import { SearchParams } from 'types/api'
import {
  UserAudit,
  UserAuditActions,
  UserAuditContextState,
  UserAuditPaginationParams
} from './types'
import { DateFilter } from 'types/filters'
import { Params } from 'utils/ParamsBuilder'
import { actions } from './constants'
import useApi from 'hooks/useApi'

const orderByMapper = {}

export const useActions = (
  state: UserAuditContextState,
  dispatch
): UserAuditActions => {
  const { id, dateFilter, pagination, searchFilter } = state

  const getAudits = useApi({
    endpoint: 'audits',
    method: 'get'
  })

  const setUserId = (userId?: string): void => {
    dispatch(actions.setUserID(userId))
  }

  const getData = async (
    params?: UserAuditPaginationParams & SearchParams & DateFilter,
    getTotal: boolean = false
  ): Promise<void> => {
    try {
      if (!id) return
      const urlParams = Params.Builder(params)
        .pagination(pagination)
        .searchFilters(searchFilter)
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .putStaticFilter('user', id)
        .build()

      const [response, total] = await Promise.all([
        getAudits({ urlParams }),
        getTotal
          ? getAudits({ urlParams: { page: 1, limit: 1 } })
              .then((res) => res.size)
              .catch(() => null)
          : Promise.resolve(null)
      ])

      dispatch(
        actions.setData(
          (response.data as any[]).map<UserAudit>((datum) => ({
            id: datum.id,
            action: datum.action,
            createdAt: datum.created_at,
            name: datum.name,
            userId: datum?.user?.id ?? '',
            username: datum?.user?.username ?? ''
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

  return {
    setUserId,
    getData
  }
}
