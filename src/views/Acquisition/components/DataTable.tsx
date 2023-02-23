import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { SortingState } from '@tanstack/react-table'
import IconButton from 'components/Button/IconButton'
import Switch from 'components/Form/Switch'
import Table from 'components/Table'
import { format } from 'date-fns'
import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useState } from 'react'
import { tableMessages } from '../messages'
import { Line, data } from '../types'

const DataTable = (): ReactElement => {
  const getMessage = useFormatMessage(tableMessages)
  const [sortingState, setSortingState] = useState<SortingState>([])
  const [rowSelected, setRowSelected] = useState<Line | null>(null)

  console.log('🚀 ~ file: Table.tsx:20 ~ DataTable ~ rowSelected', rowSelected)

  const columns = useTableColumns<Line>(() => [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'target',
      header: getMessage('target')
    },
    {
      accessorKey: 'company',
      header: getMessage('company')
    },
    {
      accessorKey: 'source',
      header: getMessage('source')
    },
    {
      accessorKey: 'line',
      header: getMessage('derivation')
    },
    {
      accessorKey: 'user',
      header: getMessage('createdBy')
    },
    {
      accessorKey: 'date',
      header: getMessage('date'),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - hh:mm')
    },
    {
      accessorKey: 'technique',
      header: getMessage('technique')
    },
    {
      accessorKey: 'status',
      header: getMessage('status'),
      cell: ({ getValue }) => (
        <div>
          <p className="px-1 py-1 rounded-3xl bg-red-500 text-white text-center text-sm leading-none font-light">
            {getValue<string>()}
          </p>
        </div>
      )
    },
    {
      accessorKey: 'releaseDate',
      header: getMessage('releaseDate'),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - hh:mm')
    },
    {
      header: getMessage('actions'),
      cell: () => (
        <div className="flex gap-2 items-center">
          <Switch color="primary" size="sm" />
          <IconButton
            tooltip={getMessage('history')}
            className="text-muted hover:text-primary"
          >
            <DocumentMagnifyingGlassIcon className="w-4 h-4" />
          </IconButton>
        </div>
      )
    }
  ])

  return (
    <Table
      columns={columns}
      data={data}
      manualSorting={{
        onSortingChange: setSortingState,
        sorting: sortingState
      }}
      onRowClicked={setRowSelected}
    />
  )
}

export default DataTable
