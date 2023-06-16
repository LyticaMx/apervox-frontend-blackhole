import { useService } from 'hooks/useApi'
import { omit } from 'lodash'
import { ResponseData } from 'types/api'
import { actions } from './constants'
import {
  Actions,
  createPayload,
  getDataPayload,
  State,
  updatePayload
} from './types'
import { Params } from 'utils/ParamsBuilder'

const orderByMapper = {
  name: 'name',
  createdBy: 'created_by',
  createdOn: 'created_at'
}

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter } = state
  const resource = useService('devices')

  const getData = async (
    params?: getDataPayload,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...pagination, ...searchFilter })
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .build()

      const response: ResponseData = await resource.get({ urlParams })

      dispatch(actions.setData(response.data))

      if (getTotal) {
        const total: ResponseData = await resource.get({
          urlParams: { page: 1, limit: 1 }
        })

        dispatch(actions.setTotal(total.size))
      }

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

  const create = async (payload: createPayload): Promise<boolean> => {
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

  const update = async (payload: updatePayload): Promise<boolean> => {
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
