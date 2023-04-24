import { useService } from 'hooks/useApi'
import { get, omit } from 'lodash'
import { ResponseData, SearchParams } from 'types/api'
// import { Role } from 'types/auth'
import { DateFilter } from 'types/filters'
import { Scope } from 'types/scope'
import { actions } from './constants'
import {
  Actions,
  RoleCreate,
  RolesPaginationParams,
  RoleUpdate,
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

  const getRoles = async (
    params?: RolesPaginationParams & SearchParams & DateFilter
  ): Promise<void> => {
    try {
      const sort = {
        by: 'created_at',
        order: 'desc'
      }

      const mappedFilters = {}

      if (params?.sort && params.sort.length > 0) {
        const [sortBy] = params.sort
        sort.by = orderByMapper[sortBy.id] ?? sortBy.id
        sort.order = sortBy.desc ? 'desc' : 'asc'
      }

      const query = params?.query ?? searchFilter.query
      const filters = params?.filters ?? searchFilter.filters

      if (filters && filters.length > 0 && query) {
        Object.assign(
          mappedFilters,
          filters.reduce((old, key) => {
            old[key] = query
            return old
          }, {})
        )
      }

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

      dispatch(actions.setRoles(response.data))

      dispatch(
        actions.setPagination({
          page: response.page,
          limit: params?.limit ?? pagination.limit,
          totalRecords: response.size,
          sort: params?.sort ?? pagination.sort
        })
      )

      // TODO: Revisar como condicionar estos dispatch o reducirlos
      dispatch(
        actions.setFilters({
          query: params?.query ?? searchFilter.query,
          filters: params?.filters ?? searchFilter.filters
        })
      )

      dispatch(
        actions.setDateFilters({
          start_time: params?.start_time ?? dateFilter.start_time,
          end_time: params?.end_time ?? dateFilter.end_time
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  const createRole = async (payload: RoleCreate): Promise<boolean> => {
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

  const updateRole = async (payload: RoleUpdate): Promise<boolean> => {
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

  const deleteRole = async (id: string): Promise<boolean> => {
    try {
      await resource.delete({
        queryString: id
      })
      return true
    } catch {
      return false
    }
  }

  const toggleDisable = async (
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
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    toggleDisable,
    getScopes,
    exportTable
  }
}
