import { useMemo, useState } from 'react'
import { ManualPagination } from 'components/Table'

interface Props {
  page: number
  onChange: (page: number) => void
}
interface Response {
  manualPagination: ManualPagination
  setTotal: (total: number) => void
}
const useManualPagination = ({ page, onChange }: Props): Response => {
  const [totalRecords, setTotalRecords] = useState(0)

  const manualPagination = useMemo(
    () => ({
      currentPage: page - 1,
      totalRecords,
      onChange
    }),
    [page, totalRecords]
  )

  return {
    manualPagination,
    setTotal: setTotalRecords
  }
}

export default useManualPagination
