import { useService } from 'hooks/useApi'
import { omit } from 'lodash'
import { ResponseData } from 'types/api'
import { Letterhead } from 'types/letterhead'
import { actions } from './constants'
import { Actions, getDataPayload, State } from './types'

const orderByMapper = {
  name: 'name',
  createdBy: 'created_by',
  createdOn: 'created_at'
}

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter } = state
  const resource = useService('mediums')

  const getData = async (params?: getDataPayload): Promise<void> => {
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

  const create = async (payload: Omit<Letterhead, 'id'>): Promise<boolean> => {
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

  const update = async (payload: Letterhead): Promise<boolean> => {
    try {
      await resource.put({
        queryString: payload.id,
        body: omit(payload, ['id', 'users', 'scopes'])
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

  const deleteAll = async (ids: string[]): Promise<boolean> => {
    try {
      await resource.delete({
        body: { ids }
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

  return {
    getData,
    create,
    update,
    delete: deleteOne,
    deleteAll,
    toggleStatus
  }
}
