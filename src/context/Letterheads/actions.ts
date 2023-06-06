import { useService } from 'hooks/useApi'
import { ResponseData } from 'types/api'
import { Letterhead } from 'types/letterhead'
import { actions } from './constants'
import { Actions, getDataPayload, State } from './types'
import { Params } from 'utils/ParamsBuilder'

const orderByMapper = {
  name: 'name',
  createdBy: 'created_by',
  createdOn: 'created_at'
}

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter } = state
  const resource = useService('letterheads')

  const getData = async (params?: getDataPayload): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...pagination, ...searchFilter })
        .sort(pagination.sort, orderByMapper)
        .dates(dateFilter)
        .build()

      const response: ResponseData = await resource.get({
        urlParams
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
            start_time: urlParams.start_time,
            end_time: urlParams.end_time
          }
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  const create = async (payload: Omit<Letterhead, 'id'>): Promise<boolean> => {
    try {
      const formData = new FormData()
      formData.append('name', payload.name)
      formData.append('doc_type', payload.doc_type)
      formData.append('image', payload.file ?? '', payload.file?.name)
      formData.append('organization_name', payload.organization_name)

      await resource.post(
        {
          body: formData
        },
        {
          'Content-Type': 'multipart/form-data'
        }
      )

      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  const update = async (payload: Letterhead): Promise<boolean> => {
    try {
      const formData = new FormData()
      formData.append('name', payload.name)
      formData.append('doc_type', payload.doc_type)
      formData.append('organization_name', payload.organization_name)
      if (payload.file) {
        formData.append('image', payload.file ?? '', payload.file.name)
      }

      await resource.put(
        {
          queryString: payload.id,
          body: formData
        },
        {
          'Content-Type': 'multipart/form-data'
        }
      )

      return true
    } catch {
      return false
    }
  }

  const deleteOne = async (id: string): Promise<boolean> => {
    try {
      const response = await resource.delete({
        queryString: id
      })
      console.log(response)
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
