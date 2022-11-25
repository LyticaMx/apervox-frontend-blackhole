import useApi from 'hooks/useApi'
import usePagination from 'hooks/usePagination'
import { ReactElement, ReactNode, useMemo, useState } from 'react'
import { Role, RolesContextType } from 'types/roles'
import { initialState, RolesContext } from './context'

interface Props {
  children: ReactNode
}

const RolesProvider = (props: Props): ReactElement => {
  const { children } = props
  const [list, setList] = useState<Role[]>(initialState.list)
  const [page, setPage] = useState(initialState.pagination.currentPage)
  const [size, setSize] = useState(initialState.pagination.currentSize)
  const { pagination, setTotal } = usePagination({
    page,
    onChange: setPage,
    size,
    onChangeSize: setSize
  })

  const _getAll = useApi({ endpoint: 'roles', method: 'get' })

  const getAll = async (): Promise<boolean> => {
    try {
      const response = await _getAll({
        urlParams: {
          page: page + 1,
          limit: size
        }
      })

      setTotal(response.page_info.total_records)
      setList(response.data)

      return true
    } catch {
      return false
    }
  }

  const contextValue = useMemo<RolesContextType>(
    () => ({
      list,
      pagination: {
        ...pagination,
        rowsPerPageOptions: initialState.pagination.rowsPerPageOptions
      },
      actions: {
        getAll
      }
    }),
    [list, page, size]
  )

  return (
    <RolesContext.Provider value={contextValue}>
      {children}
    </RolesContext.Provider>
  )
}

export { RolesProvider }
