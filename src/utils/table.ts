import { SortingState } from '@tanstack/react-table'
import { SearchParams } from 'types/api'
import { camelToSnakeCase } from './string'

interface SortFilter {
  by: string
  order: string
}

export const getSort = (
  sort?: SortingState,
  defaultSort?: SortFilter
): SortFilter | undefined => {
  if (sort && sort.length > 0) {
    const [sortBy] = sort

    return {
      by: camelToSnakeCase(sortBy.id),
      order: sortBy.desc ? 'desc' : 'asc'
    }
  }

  return defaultSort
}

export const getMappedFilters = (params: SearchParams): Record<string, any> => {
  const { query, filters } = params

  const mappedFilters = (filters ?? []).reduce((old, key) => {
    if (!query) return old

    old[key] = query
    return old
  }, {})

  return mappedFilters
}
