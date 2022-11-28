export interface Pagination {
  currentPage: number
  currentSize: number
  totalRecords: number
  onChange?: (page: number) => void
  onChangeSize?: (page: number) => void
  rowsPerPageOptions?: number[]
}
