import { PhoneIcon, PhoneXMarkIcon } from '@heroicons/react/24/outline'
import { SortingState } from '@tanstack/react-table'
import Table from 'components/Table'
import { format } from 'date-fns'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useState } from 'react'
import { tableMessages } from '../messages'
import { Call } from '../types'

const CallsTable = (): ReactElement => {
  const getMessage = useFormatMessage(tableMessages)
  const getGlobalMessage = useGlobalMessage()
  const [sortingState, setSortingState] = useState<SortingState>([])
  const [rowSelected, setRowSelected] = useState<Call | null>(null)

  console.log('🚀 ~ file: Table.tsx:20 ~ CallsTable ~ rowSelected', rowSelected)

  const columns = useTableColumns<Call>(() => [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'source',
      header: getGlobalMessage('source', 'platformMessages')
    },
    {
      accessorKey: 'line',
      header: getMessage('line')
    },
    {
      accessorKey: 'target',
      header: getMessage('target')
    },
    {
      accessorKey: 'date',
      header: getMessage('date'),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'dd/MM/yyyy')
    },
    {
      accessorKey: 'date',
      header: getMessage('time'),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'hh:mm')
    },
    {
      accessorKey: 'operator',
      header: getMessage('operator')
    },
    {
      accessorKey: 'clasification',
      header: getMessage('clasification')
    },
    {
      accessorKey: 'technique',
      header: getGlobalMessage('technique', 'generalMessages')
    },
    {
      accessorKey: 'priority',
      header: getGlobalMessage('priority', 'generalMessages'),
      cell: ({ getValue }) => (
        <p className="px-1 py-0.5 rounded-3xl text-sm">
          <span className="w-3 h-3 rounded-full bg-primary inline-block mr-2" />
          {getValue<string>()}
        </p>
      )
    },
    {
      accessorKey: 'type',
      header: getMessage('callType'),
      cell: ({ getValue }) => (
        <p className="px-1 py-0.5 rounded-3xl text-sm flex items-center gap-2">
          <PhoneIcon className="w-4 h-4 text-muted" />
          {getValue<string>()}
        </p>
      )
    },
    {
      accessorKey: 'user',
      header: getMessage('workBy')
    },
    {
      accessorKey: 'status',
      header: getGlobalMessage('status', 'generalMessages'),
      cell: ({ getValue }) => (
        <p className="px-1 py-0.5 rounded-3xl bg-red-500 text-white text-center text-sm">
          {getValue<string>()}
        </p>
      )
    },
    {
      header: getGlobalMessage('actions', 'generalMessages'),
      cell: () => (
        <div>
          <PhoneXMarkIcon className="w-4 h-4 text-muted" />
        </div>
      )
    }
  ])

  return (
    <Table
      columns={columns}
      data={[
        {
          id: '001',
          date: '2023-02-14T18:58:02.626Z',
          source: 'ETSI',
          target: '5623456908',
          line: '5623456908',
          operator: 'Telcel',
          technique: 'T.I.45/2022-2',
          priority: 'Urgente',
          clasification: 'Revelante',
          label: 'Crimen Org',
          type: 'Verificación',
          status: 'En vivo',
          user: 'Efra Cuadras'
        },
        {
          id: '002',
          date: '2023-02-14T18:58:02.626Z',
          source: 'ETSI',
          target: '5623456908',
          line: '5623456908',
          operator: 'Telcel',
          technique: 'T.I.45/2022-2',
          priority: 'Urgente',
          clasification: 'Revelante',
          label: 'Crimen Org',
          type: 'Verificación',
          status: 'En vivo',
          user: 'Efra Cuadras'
        },
        {
          id: '003',
          date: '2023-02-14T18:58:02.626Z',
          source: 'ETSI',
          target: '5623456908',
          line: '5623456908',
          operator: 'Telcel',
          technique: 'T.I.45/2022-2',
          priority: 'Urgente',
          clasification: 'Revelante',
          label: 'Crimen Org',
          type: 'Verificación',
          status: 'Colgada',
          user: 'Efra Cuadras'
        },
        {
          id: '004',
          date: '2023-02-14T18:58:02.626Z',
          source: 'ETSI',
          target: '5623456908',
          line: '5623456908',
          operator: 'Telcel',
          technique: 'T.I.45/2022-2',
          priority: 'Urgente',
          clasification: 'Revelante',
          label: 'Crimen Org',
          type: 'Verificación',
          status: 'En vivo',
          user: 'Efra Cuadras'
        }
      ]}
      manualSorting={{
        onSortingChange: setSortingState,
        sorting: sortingState
      }}
      onRowClicked={setRowSelected}
    />
  )
}

export default CallsTable
