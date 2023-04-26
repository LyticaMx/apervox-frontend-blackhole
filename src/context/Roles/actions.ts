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
  State
} from './types'

const orderByMapper = {
  name: 'names',
  createdBy: 'created_by',
  createdOn: 'created_at',
  lastName: 'last_name'
}

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter } = state
  const resource = useService('roles')

  const getData = async (
    params?: RolesPaginationParams & SearchParams & DateFilter
  ): Promise<void> => {
    try {
      const sort = {
        by: 'created_at',
        order: 'desc'
      }

      if (params?.sort && params.sort.length > 0) {
        const [sortBy] = params.sort
        sort.by = orderByMapper[sortBy.id] ?? sortBy.id
        sort.order = sortBy.desc ? 'desc' : 'asc'
      }

      const query = params?.query ?? searchFilter.query
      const filters = params?.filters ?? searchFilter.filters

      const mappedFilters = (filters ?? []).reduce((old, key) => {
        if (!query) return old

        old[key] = query
        return old
      }, {})

      // TODO: cambiar el response data
      const response: ResponseData = await resource.get({
        urlParams: {
          ...sort,
          ...mappedFilters,
          page: params?.page ?? pagination.page,
          limit: params?.limit ?? pagination.limit,
          start_time: params?.start_time ?? dateFilter.start_time,
          end_time: params?.end_time ?? dateFilter.end_time
        }
      })

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
            start_time: params?.start_time ?? dateFilter.start_time,
            end_time: params?.end_time ?? dateFilter.end_time
          }
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  const create = async (payload: PayloadCreate): Promise<boolean> => {
    try {
      await resource.post({
        body: payload
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
        body: get(payload, ['scopes'], [])
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
