import { useService } from 'hooks/useApi'
import { omit } from 'lodash'
import { actions } from './constants'
import {
  Actions,
  CreatePayload,
  GetPayload,
  State,
  UpdatePayload
} from 'types/overflowLine'
import { Params } from 'utils/ParamsBuilder'

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter } = state
  const resource = useService('overflow-lines')

  const get = async (
    params?: GetPayload,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...pagination, ...searchFilter })
        .sort(pagination.sort, { created_by: 'created_by.username', medium_name: 'medium.name' })
        .dates(dateFilter)
        .putStaticFilter('line_status', params?.line_status)
        .build()

      const [response] = await Promise.all([
        resource.get({ urlParams }),
        getTotal ? getTotales() : Promise.resolve(null)
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
