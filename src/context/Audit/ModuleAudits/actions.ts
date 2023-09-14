import { SearchParams } from 'types/api'
import {
  AuditContextState,
  AuditActions,
  AuditPaginationParams,
  StaticFilter,
  Audit,
  AuditableModules,
  AuditableActions
} from './types'
import { DateFilter } from 'types/filters'
import { Params } from 'utils/ParamsBuilder'
import useApi from 'hooks/useApi'
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
  const { pagination, dateFilter, searchFilter /* staticFilter */ } = state

  const getAudits = useApi({
    endpoint: 'audits',
    method: 'get'
  })

  const createAudit = useApi({ endpoint: 'audits', method: 'post' })

  const getData = async (
    params?: AuditPaginationParams & SearchParams & DateFilter & StaticFilter,
    getTotal: boolean = false
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .pagination(pagination)
        .searchFilters(searchFilter)
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        // TODO Añadir filtros estaticos
        .putStaticFilter('specific_module', [
          'me',
          'users',
          'sessions',
          'roles',
          'groups',
          'settings',
          'labels',
          'letterheads',
          'carriers',
          'acquisition_mediums',
          'devices',
          'overflow_lines',
          'verification_lines',
          'techniques',
          'targets'
        ])
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
          }
        })
      )
    } catch {}
  }

  const genAudit = async (
    moduleName: AuditableModules,
    action: AuditableActions = AuditableActions.GET_IN
  ): Promise<void> => {
    try {
      const response = await createAudit(
        {
          queryString: moduleName,
          body: {
            action
          }
        },
        {
          'x-api-key': process.env.REACT_APP_X_API_KEY
        }
      )
      console.log(response)
    } catch {}
  }

  return {
    genAudit,
    getData
  }
}
