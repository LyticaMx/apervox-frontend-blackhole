import { useService } from 'hooks/useApi'
import {
  Actions,
  createPayload,
  getDataPayload,
  State,
  updatePayload
} from 'types/target'
import { Params } from 'utils/ParamsBuilder'
import { actions } from './constants'

export const useActions = (state: State, dispatch): Actions => {
  const { pagination, dateFilter, searchFilter, total } = state
  const resource = useService('targets')
  const techniqueService = useService('techniques')

  const findAll = (
    techniqueId?: string,
    urlParams?: any
  ): Awaited<Promise<any>> => {
    if (techniqueId) {
      return techniqueService.get({
        queryString: `${techniqueId}/targets`,
        urlParams
      })
    }

    return resource.get({ urlParams })
  }

  const getData = async (
    params?: getDataPayload,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...pagination, ...searchFilter })
        .sort(pagination.sort, {
          created_by: 'created_by.username',
          medium_name: 'medium.name'
        })
        .dates(dateFilter)
        .build()

      const techniqueId: string = params?.technique_id ?? ''

      const [response, totalResponse] = await Promise.all([
        findAll(techniqueId, {
          limit: 1,
          page: params?.page ?? pagination.page
        }),
        getTotal
          ? findAll(techniqueId, { page: 1, limit: 1 })
          : Promise.resolve(null)
      ])

      dispatch(
        actions.setData(
          response.data.map((item) => ({
            id: item.id,
            name: item.alias,
            phone_number: item.phone,
            type: 'etsi'
          }))
        )
      )

      dispatch(actions.setTotal(totalResponse?.size ?? total))

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
      const techniqueId = payload.technique_id ?? ''

      await techniqueService.post({
        queryString: `${techniqueId}/targets`,
        body: {
          alias: payload.name,
          phone: payload.phone_number,
          overflow_line_id: payload.overflow_id,
          carrier_id: payload.phone_company
        }
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
        body: {
          alias: payload.name,
          phone: payload.phone_number,
          overflow_line_id: payload.overflow_id,
          carrier_id: payload.phone_company
        }
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

  return {
    getData,
    create,
    update,
    delete: deleteOne,
    deleteMany
  }
}
