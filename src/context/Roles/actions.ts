import { useService } from 'hooks/useApi'
import { get, omit } from 'lodash'
import { ResponseData, SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'
import { Scope } from 'types/scope'
import { actions } from './constants'
import {
  Actions,
  PayloadCreate,
  RolesPaginationParams,
  PayloadUpdate,
  StaticFilters,
  State
} from './types'
import { Params } from 'utils/ParamsBuilder'

const orderByMapper = {
  name: 'name',
  createdBy: 'created_by',
  createdOn: 'created_at',
  lastName: 'last_name'
}

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter } = state
  const resource = useService('roles')

  const getData = async (
    params?: RolesPaginationParams & SearchParams & DateFilter & StaticFilters,
    getTotalRows?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...pagination, ...searchFilter })
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .putStaticFilter('status', params?.status)
        .build()

      const [response] = await Promise.all([
        await resource.get({ urlParams }),
        getTotalRows ? getTotal() : Promise.resolve(null)
      ])

      dispatch(actions.setData(response.data))

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
    } catch (e) {
      console.log(e)
    }
  }

  const getTotal = async (): Promise<void> => {
    try {
      const response: ResponseData = await resource.get({
        urlParams: { page: 1, limit: 1 }
      })

      dispatch(actions.setTotal(response.size))
    } catch (error) {
      dispatch(actions.setTotal(0))
    }
  }

  const create = async (payload: PayloadCreate): Promise<boolean> => {
    try {
      await resource.post({
        body: {
          ...payload,
          scopes: get(payload, ['scopes'], [] as Scope[]).map((scope) => {
            if (scope.name === 'call_evidences') {
              // Las evidencias no pueden ser eliminadas ni creadas
              return { ...scope, delete: false, create: false }
            }
            return scope
          })
        }
      })

      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  const update = async (payload: PayloadUpdate): Promise<boolean> => {
    try {
      await resource.put({
        queryString: payload.id,
        body: omit(payload, ['id', 'users', 'scopes'])
      })
      await resource.put({
        queryString: `${payload.id}/users`,
        body: get(payload, ['users'], [])
      })
      await resource.put({
        queryString: `${payload.id}/scopes`,
        body: get(payload, ['scopes'], [] as Scope[]).map((scope) => {
          if (scope.name === 'call_evidences') {
            // Las evidencias no pueden ser eliminadas ni creadas
            return { ...scope, delete: false, create: false }
          }
          return scope
        })
      })
      return true
    } catch {
      return false
    }
  }

  const deleteOne = async (id: string): Promise<boolean> => {
    try {
      await resource.delete({
        queryString: id
      })
      return true
    } catch {
      return false
    }
  }

  const toggleStatus = async (
    id: string,
    enabled: boolean
  ): Promise<boolean> => {
    try {
      await resource.put({
        queryString: id,
        body: {
          status: enabled
        }
      })

      return true
    } catch {
      return false
    }
  }

  const getScopes = async (id: string): Promise<Scope[]> => {
    try {
      const response = await resource.get({ queryString: `${id}/scopes` })

      return response.data
    } catch {
      return []
    }
  }

  const exportTable = async (): Promise<void> => {}

  return {
    getData,
    create,
    update,
    delete: deleteOne,
    toggleStatus,
    getScopes,
    exportTable
  }
}
