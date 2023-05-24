import { useService } from 'hooks/useApi'
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
  const resource = useService('letterheads')

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

      const startTime =
        params?.start_time ??
        (!params?.clearDates ? dateFilter.start_time : undefined)

      const endTime =
        params?.end_time ??
        (!params?.clearDates ? dateFilter.end_time : undefined)

      // TODO: cambiar el response data
      const response: ResponseData = await resource.get({
        urlParams: {
          ...sort,
          ...mappedFilters,
          page: params?.page ?? pagination.page,
          limit: params?.limit ?? pagination.limit,
          start_time: startTime,
          end_time: endTime
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
