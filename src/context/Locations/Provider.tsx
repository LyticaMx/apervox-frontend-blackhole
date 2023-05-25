import { ReactElement, ReactNode, useMemo, useState } from 'react'
import { LocationContext, initialState } from './context'
import { LocationContextType } from 'types/location'
import { DateFilter, SearchFilter } from 'types/filters'
import { PaginationParams } from 'types/api'

interface Props {
  children: ReactNode
}

const LocationProvider = ({ children }: Props): ReactElement => {
  const [location, setLocation] = useState(initialState)

  const get = async (
    params?: PaginationParams & SearchFilter & DateFilter,
    getTotal?: boolean
  ): Promise<void> => {
    try {
      const query = params?.query ?? location.searchFilter.query
      const filters = params?.filters ?? location.searchFilter.filters

      const mappedFilters = {}

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
        (!params?.clearDates ? location.dateFilter.start_time : undefined)

      const endTime =
        params?.end_time ??
        (!params?.clearDates ? location.dateFilter.end_time : undefined)

      console.log({
        ...mappedFilters,
        page: params?.page ?? location.pagination.page,
        limit: params?.limit ?? location.pagination.limit,
        start_time: startTime,
        end_time: endTime
      })

      setLocation({
        data: [
          {
            id: '001',
            cellId: '135098745',
            latitude: '-56.987656',
            longitude: '90.187654',
            createdAt: '2023-01-12T16:04:27.161Z'
          },
          {
            id: '002',
            cellId: '120654680',
            latitude: '-45.123456',
            longitude: '145.109187',
            createdAt: '2023-01-12T15:04:27.161Z'
          },
          {
            id: '003',
            cellId: '135452976',
            latitude: '-30.122675',
            longitude: '150.112345',
            createdAt: '2023-01-12T14:04:27.161Z'
          }
        ],
        dateFilter: {
          start_time: startTime,
          end_time: endTime
        },
        pagination: {
          page: 1,
          limit: params?.limit ?? location.pagination.limit,
          totalRecords: 3
        },
        total: 3,
        searchFilter: {
          query: params?.query ?? location.searchFilter.query,
          filters: params?.filters ?? location.searchFilter.filters
        }
      })
    } catch {}
  }

  const contextValue = useMemo<LocationContextType>(
    () => Object.assign({}, location, { actions: { get } }),
    [location]
  )

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  )
}

export { LocationProvider }
