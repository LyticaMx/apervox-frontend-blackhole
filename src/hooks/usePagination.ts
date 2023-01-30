import { useState } from 'react'

interface Pagination {
  page: number
  limit: number
}
interface PaginationDefault {
  page?: number
  limit?: number
}

export interface PaginationResponse extends Pagination {
  setPagination: (pagination: Pagination) => void
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

const usePagination = (
  defaultValues?: PaginationDefault
): PaginationResponse => {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    ...(defaultValues?.page ? { page: defaultValues.page } : {}),
    ...(defaultValues?.limit ? { limit: defaultValues.limit } : {})
  })

  return {
    page: pagination.page,
    limit: pagination.limit,
    setPagination,
    setPage: (page: number) => {
      setPagination((prev) => ({ ...prev, page }))
    },
    setLimit: (limit: number) => {
      setPagination((prev) => ({ ...prev, limit }))
    }
  }
}

export default usePagination
