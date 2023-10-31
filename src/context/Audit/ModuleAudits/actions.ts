import { SearchParams } from 'types/api'
import {
  AuditContextState,
  AuditActions,
  StaticFilter,
  AuditableModules,
  AuditableActions,
  AuditedUser
} from './types'
import { DateFilter } from 'types/filters'
import { Params } from 'utils/ParamsBuilder'
import useApi from 'hooks/useApi'
import { actions } from './constants'
import { Audit, AuditPaginationParams } from '../types'

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
  const getUser = useApi({ endpoint: 'users', method: 'get' })

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
        .putStaticFilter('module', [
          'roles',
          'groups',
          'adquisition',
          'users',
          'techniques',
          'monitor',
          'settings',
          'metadata'
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
    action: AuditableActions = AuditableActions.GET_IN,
    name?: string
  ): Promise<void> => {
    try {
      await createAudit(
        {
          queryString: moduleName,
          body: {
            action,
            name
          }
        },
        {
          'x-api-key': process.env.REACT_APP_X_API_KEY
        }
      )
    } catch {}
  }

  const getAuditedUser = async (id: string): Promise<AuditedUser | null> => {
    try {
      const response = await getUser({ queryString: id })

      return {
        id: response.data?.id ?? '',
        name: response.data?.profile?.names ?? '',
        surnames: response.data?.profile?.last_name ?? '',
        email: response.data?.email ?? '',
        createdBy: response.data?.created_by ?? '',
        createdOn: new Date(response.data?.created_at ?? 0),
        extension: response.data?.company?.phone_extension ?? '',
        position: response.data?.company?.position ?? '',
        groups: response.data?.groups?.map((item) => item.name).join(', '),
        username: response.data?.username ?? '',
        userRol: response.data?.role?.name ?? ''
      }
    } catch {
      return null
    }
  }

  return {
    genAudit,
    getData,
    getAuditedUser
  }
}
