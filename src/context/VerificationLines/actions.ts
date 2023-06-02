import { useService } from 'hooks/useApi'
import { omit, pick } from 'lodash'
import {
  Actions,
  State,
  GetPayload,
  CreatePayload,
  UpdatePayload
} from 'types/verificationLine'
import { getMappedFilters, getSort } from 'utils/table'
import { actions } from './constants'

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter, total } = state
  const resource = useService('verification-lines')

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
      const [response, totalResponse] = await Promise.all([
        resource.get({
          urlParams: {
            ...sort,
            ...mappedFilters,
            page: params?.page ?? pagination.page,
            limit: params?.limit ?? pagination.limit,
            start_time: params?.start_time ?? dateFilter.start_time,
            end_time: params?.end_time ?? dateFilter.end_time
          }
        }),
        getTotal ? resource.get({ urlParams: { page: 1, limit: 1 } }) : null
      ])

      dispatch(
        actions.setVerificationLines({
          data: response.data,
          total: totalResponse?.size ?? total
        })
      )

      dispatch(
        actions.setVerificationLinePagination({
          page: response.page,
          limit: params?.limit ?? pagination.limit,
          totalRecords: response.size,
          sort: params?.sort ?? pagination.sort
        })
      )

      dispatch(
        actions.setVerificationLineFilters({
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

  const toggleStatus = async (
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
    toggleStatus
  }
}
