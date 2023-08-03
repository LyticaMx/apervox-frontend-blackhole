import { PhoneIcon, PhoneXMarkIcon } from '@heroicons/react/24/outline'
import Table from 'components/Table'
import { format } from 'date-fns'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useEffect } from 'react'
import { tableMessages } from '../messages'
import { Call } from '../types'
import { useMonitoring } from 'context/Monitoring'

const CallsTable = (): ReactElement => {
  const getMessage = useFormatMessage(tableMessages)
  const getGlobalMessage = useGlobalMessage()
  const { actions, pagination } = useMonitoring()

  useEffect(() => {
    actions?.getData({}, true)
  }, [])

  const columns = useTableColumns<Call>(() => [
    {
      accessorKey: 'id',
      header: 'ID'
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
      header: getMessage('time'),
      cell: ({ row }) => format(new Date(row.original.date), 'hh:mm')
    },
    {
      accessorKey: 'operator',
      header: getMessage('operator')
    },
    {
      accessorKey: 'technique',
      header: getMessage('technique')
    },
    {
      accessorKey: 'priority',
      header: getMessage('priority'),
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
          target: '5623456908',
          operator: 'Telcel',
          technique: 'T.I.45/2022-2',
          priority: 'Urgente',
          type: 'Verificación',
          status: 'En vivo'
        },
        {
          id: '002',
          date: '2023-02-14T18:58:02.626Z',
          target: '5623456908',
          operator: 'Telcel',
          technique: 'T.I.45/2022-2',
          priority: 'Urgente',
          type: 'Verificación',
          status: 'En vivo'
        },
        {
          id: '003',
          date: '2023-02-14T18:58:02.626Z',
          target: '5623456908',
          operator: 'Telcel',
          technique: 'T.I.45/2022-2',
          priority: 'Urgente',
          type: 'Verificación',
          status: 'Colgada'
        },
        {
          id: '004',
          date: '2023-02-14T18:58:02.626Z',
          target: '5623456908',
          operator: 'Telcel',
          technique: 'T.I.45/2022-2',
          priority: 'Urgente',
          type: 'Verificación',
          status: 'En vivo'
        }
      ]}
      manualSorting={{
        onSortingChange: (sort) => actions?.getData({ sort, page: 1 }),
        sorting: pagination.sort
      }}
    />
  )
}

export default CallsTable
