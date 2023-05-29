import {
  Actions,
  State,
  TechniquesPaginationParams,
  TechniquesStaticFilter
} from './types'

import { actions } from './constants'
import { techniquesData } from 'views/Techniques/mocks'
import { SearchParams } from 'types/api'
import { DateFilter } from 'types/filters'

const orderByMapper = {}

const useActions = (state: State, dispatch): Actions => {
  const { pagination, searchFilter, dateFilter } = state

  const get = async (
    params?: TechniquesPaginationParams &
      SearchParams &
      DateFilter &
      TechniquesStaticFilter,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const sort = {
        by: 'created_at',
        order: 'desc'
      }

      const mappedFilters = {}

      const [sortBy] = params?.sort ?? pagination.sort
      if (sortBy) {
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

      const startTime =
        params?.start_time ??
        (!params?.clearDates ? dateFilter.start_time : undefined)

      const endTime =
        params?.end_time ??
        (!params?.clearDates ? dateFilter.end_time : undefined)

      dispatch(
        actions.setTechniques({
          data: techniquesData,
          total: techniquesData.length
        })
      )

      dispatch(
        actions.setTechniquesPagination({
          page: 1,
          limit: params?.limit ?? pagination.limit,
          totalRecords: 15,
          sort: params?.sort ?? pagination.sort
        })
      )

      dispatch(
        actions.setTechniquesFilters({
          search: {
            query: params?.query ?? searchFilter.query,
            filters: params?.filters ?? searchFilter.filters
          },
          date: {
            start_time: startTime,
            end_time: endTime
          }
        })
      )

      console.log('====================================')
      console.log({ sort, mappedFilters, data: { startTime, endTime } })
      console.log('====================================')
    } catch {}
  }

  const deleteOne = async (
    id: string,
    full: boolean = false
  ): Promise<boolean> => true

  const deleteMany = async (
    ids: string[],
    full: boolean = false
  ): Promise<boolean> => true

  return {
    get,
    deleteOne,
    deleteMany
  }
}

export { useActions }
