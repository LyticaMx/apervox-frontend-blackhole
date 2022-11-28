import { useMemo, useState } from 'react'
import { Pagination } from 'types/pagination'

interface Props {
  page: number
  size: number
  onChange: (page: number) => void
  onChangeSize: (size: number) => void
}
interface Response {
  pagination: Pagination
  setTotal: (total: number) => void
}
const usePagination = ({
  page,
  onChange,
  size,
  onChangeSize
}: Props): Response => {
  const [totalRecords, setTotalRecords] = useState(0)

  const pagination = useMemo(
    () => ({
      currentPage: page,
      size,
      currentSize: size,
      totalRecords,
      onChangeSize,
      onChange
    }),
    [page, totalRecords, size]
  )

  return {
    pagination,
    setTotal: setTotalRecords
  }
}

export default usePagination
