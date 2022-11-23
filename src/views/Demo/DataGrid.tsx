import { ReactElement, useEffect, useMemo, useState } from 'react'
import { evidences } from 'dummy/data'
import DataGridComponent from 'components/DataGrid'
import { ColumnDef } from '@tanstack/react-table'
import { Evidence } from 'types/evidence'
import { EyeIcon, LockClosedIcon } from '@heroicons/react/20/solid'
import usePagination from 'hooks/usePagination'

const DataGrid = (): ReactElement => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(150)
  const { pagination, setTotal } = usePagination({
    page,
    onChange: setPage,
    size: pageSize,
    onChangeSize: setPageSize
  })

  useEffect(() => {
    setTotal(evidences.length)
  }, [evidences])

  const columns = useMemo<Array<ColumnDef<Evidence>>>(
    () => [
      { accessorKey: 'event', header: 'Evento' },
      { accessorKey: 'objective', header: 'Objetivo' },
      {
        accessorKey: 'type',
        header: 'Tipo',
        cell: (data) => <span>{data.getValue() as string}</span>
      },
      {
        accessorKey: 'classification',
        cell: (data) => (
          <span className="font-bold">{data.getValue() as string}</span>
        ),
        header: 'Clasificación'
      },
      {
        accessorKey: 'workingOn',
        header: 'Estado',
        cell: (data) => (
          <div className="flex">
            {(data.getValue() as boolean) ? (
              <LockClosedIcon className="w-5 h-5 fill-rose-600" />
            ) : (
              <EyeIcon className="w-5 h-5 fill-gray-400" />
            )}
          </div>
        )
      }
    ],
    []
  )

  return (
    <DataGridComponent
      columns={columns}
      data={evidences[pagination.currentPage]}
      height={600}
      pagination={pagination}
      totalItems={453}
    />
  )
}

export default DataGrid
