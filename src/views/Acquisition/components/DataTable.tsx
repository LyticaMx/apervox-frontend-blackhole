import {
  DocumentMagnifyingGlassIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import IconButton from 'components/Button/IconButton'
import Switch from 'components/Form/Switch'
import Table from 'components/Table'
import { format } from 'date-fns'
import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useEffect, useState } from 'react'
import { tableMessages } from '../messages'
import { OverflowLine } from 'types/overflowLine'
import { useOverflowLine } from 'context/OverflowLines'
import { useToggle } from 'hooks/useToggle'
import EditOverflowLineDrawer from './EditOverflowLineDrawer'
import DeleteOverflowLineDialog from './DeleteOverflowLineDialog'
import DisableOverflowLineDialog from './DisableOverflowLineDialog'

interface SynchroEditIds {
  ids: string[]
  resolve: ((value: boolean | PromiseLike<boolean>) => void) | null
}

const DataTable = (): ReactElement => {
  const getMessage = useFormatMessage(tableMessages)
  const { data, pagination, actions: overflowLineActions } = useOverflowLine()
  const [rowSelected, setRowSelected] = useState<OverflowLine | null>(null)
  const [disableOverflowLine, setDisableOverflowLine] = useState<{
    id: string
    status: boolean
  }>({ id: '', status: false })
  const [deleteOverflowLines, setDeleteOverflowLines] =
    useState<SynchroEditIds>({ ids: [], resolve: null })
  const [open, toggle] = useToggle()

  const columns = useTableColumns<OverflowLine>(() => [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'target.phone',
      header: getMessage('target')
    },
    {
      accessorKey: 'target.carrier',
      header: getMessage('company')
    },
    {
      accessorKey: 'medium.name',
      header: getMessage('acquisitionMedium')
    },
    {
      accessorKey: 'phone',
      header: getMessage('derivation')
    },
    {
      accessorKey: 'createdBy',
      header: getMessage('createdBy')
    },
    {
      accessorKey: 'createdOn',
      header: getMessage('date'),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - hh:mm')
    },
    {
      accessorKey: 'target.technique',
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
      enableSorting: false,
      accessorKey: 'enabled',
      cell: ({ getValue, row }) => (
        <div className="flex gap-2 items-center">
          <Switch
            color="primary"
            size="sm"
            stopPropagation
            value={getValue<boolean>() ?? false}
            onChange={() =>
              setDisableOverflowLine({
                id: row.original.id ?? '',
                status: getValue<boolean>() ?? false
              })
            }
          />
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

  useEffect(() => {
    overflowLineActions?.get({ page: 1 }, true)
  }, [])

  return (
    <>
      <EditOverflowLineDrawer
        open={open}
        overflowLine={rowSelected}
        onClose={toggle}
      />
      <DeleteOverflowLineDialog
        ids={deleteOverflowLines.ids}
        resolve={deleteOverflowLines.resolve ?? (() => {})}
        onConfirm={() => setDeleteOverflowLines({ ids: [], resolve: null })}
        onClose={() => {
          if (deleteOverflowLines.resolve) deleteOverflowLines.resolve(false)
          setDeleteOverflowLines({ ids: [], resolve: null })
        }}
      />
      <DisableOverflowLineDialog
        id={disableOverflowLine.id}
        currentStatus={disableOverflowLine.status}
        onClose={() => setDisableOverflowLine({ id: '', status: false })}
      />
      <Table
        columns={columns}
        data={data}
        manualSorting={{
          onSortingChange: (sort) => overflowLineActions?.get({ sort }),
          sorting: pagination.sort
        }}
        withCheckbox
        onRowClicked={(row) => {
          setRowSelected(row)
          toggle()
        }}
        actionsForSelectedItems={[
          {
            name: 'delete',
            action: async (items) =>
              await new Promise<boolean>((resolve) =>
                setDeleteOverflowLines({
                  ids: items.map((item) => item.id ?? ''),
                  resolve
                })
              ),
            Icon: TrashIcon
          }
        ]}
      />
    </>
  )
}

export default DataTable
