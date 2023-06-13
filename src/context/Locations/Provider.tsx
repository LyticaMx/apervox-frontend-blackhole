import { ReactElement, ReactNode, useMemo, useState } from 'react'
import { LocationContext, initialState } from './context'
import { LocationContextType } from 'types/location'
import { DateFilter, SearchFilter } from 'types/filters'
import { PaginationParams } from 'types/api'
import { Params } from 'utils/ParamsBuilder'

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
      const urlParams = Params.Builder(params)
        .paginateAndSeach({ ...location.pagination, ...location.searchFilter })
        .dates(location.dateFilter)
        .build()

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
          start_time: urlParams.start_time,
          end_time: urlParams.end_time
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
