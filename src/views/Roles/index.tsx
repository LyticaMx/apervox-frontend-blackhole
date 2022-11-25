import DataGrid from 'components/DataGrid'
import Typography from 'components/Typography'
import { useRoles } from 'context/Roles'
import { ReactElement, useEffect } from 'react'
import { useColumns } from './hooks/useColumns'

const Roles = (): ReactElement => {
  const { list, actions, pagination } = useRoles()
  const columns = useColumns()

  useEffect(() => {
    actions?.getAll()
  }, [pagination.currentPage, pagination.currentSize])

  return (
    <div>
      <Typography variant="title" component="h1" className="mb-5">
        Perfiles
      </Typography>
      <DataGrid
        columns={columns}
        data={list}
        height={450}
        pagination={pagination}
        totalItems={pagination.totalRecords}
      />
    </div>
  )
}

export default Roles
