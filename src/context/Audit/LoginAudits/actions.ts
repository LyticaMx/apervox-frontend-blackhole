import useApi from 'hooks/useApi'
import { Audit, AuditContextState, AuditPaginationParams } from '../types'
import { AuditActions } from './types'
import { SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import { Params } from 'utils/ParamsBuilder'
import { actions } from './constants'

const orderByMapper = {
  user: 'user.username',
  date: 'created_at',
  hour: 'created_at'
}

export const useActions = (
  state: AuditContextState,
  dispatch
): AuditActions => {
  const { pagination, dateFilter, searchFilter } = state

  const getAudits = useApi({
    endpoint: 'audits',
    method: 'get'
  })

  const getData = async (
    params?: AuditPaginationParams & SearchParams & DateFilter,
    getTotal: boolean = false
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .pagination(pagination)
        .searchFilters(searchFilter)
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .putStaticFilter('module', 'auth')
        .build()

      const [response, total] = await Promise.all([
        getAudits({ urlParams }),
        getTotal
          ? getAudits({ urlParams: { page: 1, limit: 1, module: 'auth' } })
              .then((res) => res.size)
              .catch(() => null)
          : Promise.resolve(null)
      ])

      dispatch(
        actions.setData(
          (response.data as any[]).map<Audit>((datum) => ({
            id: datum.id,
            userId: datum?.user?.id ?? '',
            username: datum?.user?.username ?? '',
            moduleName: datum.module,
            specificModule: datum.specific_module ?? '',
            action: datum.action,
            name: datum.name,
            modelId: datum.model_id,
            old: datum.old,
            new: datum.new,
            createdAt: datum.created_at
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

  return { getData }
}
