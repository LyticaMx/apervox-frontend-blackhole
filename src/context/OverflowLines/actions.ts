import { useService } from 'hooks/useApi'
import { omit, pick } from 'lodash'
import { getMappedFilters, getSort } from 'utils/table'
import { actions } from './constants'
import {
  Actions,
  CreatePayload,
  GetPayload,
  State,
  UpdatePayload
} from 'types/overflowLine'

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter } = state
  const resource = useService('overflow-lines')

  const get = async (
    params?: GetPayload,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const sort = getSort(params?.sort ?? pagination.sort, {
        by: 'created_at',
        order: 'desc'
      })

      const mappedFilters = getMappedFilters({
        ...searchFilter,
        ...pick(params, ['query', 'filters'])
      })

      // TODO: cambiar el response data
      const [response] = await Promise.all([
        resource.get({
          urlParams: {
            ...sort,
            ...mappedFilters,
            line_status: params?.line_status,
            page: params?.page ?? pagination.page,
            limit: params?.limit ?? pagination.limit,
            start_time: params?.start_time ?? dateFilter.start_time,
            end_time: params?.end_time ?? dateFilter.end_time
          }
        }),
        getTotal ? getTotales() : null
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
            start_time: params?.start_time ?? dateFilter.start_time,
            end_time: params?.end_time ?? dateFilter.end_time
          }
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  const getTotales = async (): Promise<void> => {
    try {
      const res = await Promise.all([
        resource.get({
          urlParams: { page: 1, limit: 1 }
        }),
        resource.get({
          urlParams: { page: 1, limit: 1, line_status: 'available' }
        }),
        resource.get({
          urlParams: { page: 1, limit: 1, line_status: 'assigned' }
        }),
        resource.get({
          urlParams: { page: 1, limit: 1, line_status: 'quarantine' }
        }),
        resource.get({
          urlParams: { page: 1, limit: 1, line_status: 'maintenance' }
        })
      ])

      const [all, available, assigned, quarantine, maintenance] = res.map(
        (item) => item.size
      )

      dispatch(
        actions.setTotals({
          all,
          available,
          assigned,
          quarantine,
          maintenance
        })
      )
    } catch (error) {}
  }
  const create = async (payload: CreatePayload): Promise<boolean> => {
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
  const update = async (payload: UpdatePayload): Promise<boolean> => {
    try {
      await resource.put({
        queryString: payload.id,
        body: omit(payload, ['id'])
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
  const deleteMany = async (ids: string[]): Promise<boolean> => {
    try {
      await resource.delete({
        body: { ids }
      })
      return true
    } catch {
      return false
    }
  }

  const toggleDisable = async (
    id: string,
    status: boolean
  ): Promise<boolean> => {
    try {
      await resource.put({
        queryString: id,
        body: { status }
      })

      return true
    } catch {
      return false
    }
  }

  return {
    get,
    create,
    update,
    deleteOne,
    deleteMany,
    toggleDisable
  }
}
