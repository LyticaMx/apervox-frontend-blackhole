import {
  DocumentMagnifyingGlassIcon,
  NoSymbolIcon
} from '@heroicons/react/24/outline'
import IconButton from 'components/Button/IconButton'
import Switch from 'components/Form/Switch'
import Table from 'components/Table'
import { format } from 'date-fns'
import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { statusMessages, tableMessages } from '../messages'
import { OverflowLine } from 'types/overflowLine'
import { useOverflowLine } from 'context/OverflowLines'
import { useToggle } from 'hooks/useToggle'
import EditOverflowLineDrawer from './EditOverflowLineDrawer'
import DisableOverflowLineDialog from './DisableOverflowLineDialog'
import { get } from 'lodash'
import clsx from 'clsx'
import Tooltip from 'components/Tooltip'
import { useIntl } from 'react-intl'
import { actionsMessages } from 'globalMessages'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import LineHistory from './LineHistory'
import { useLineHistory } from 'context/LineHistory'

const DataTable = (): ReactElement => {
  const { formatMessage } = useIntl()
  const getMessage = useFormatMessage(tableMessages)
  const { data, pagination, actions: overflowLineActions } = useOverflowLine()
  const { actions: lineHistoryActions } = useLineHistory()
  const { actions: auditActions } = useModuleAudits()
  const ability = useAbility()

  const [open, toggle] = useToggle()
  const [openDisable, setOpenDisable] = useState(false)

  const tableRef = useRef<any>(undefined)
  const [selected, setSelected] = useState<OverflowLine | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const colorsStatus = {
    assigned: 'bg-red-500',
    available: 'bg-blue-500',
    quarantine: 'bg-orange-500',
    maintenance: 'bg-yellow-500'
  }
  const columns = useTableColumns<OverflowLine>(
    () => [
      {
        accessorKey: 'target',
        id: 'target_phone',
        header: getMessage('target'),
        cell: ({ row }) => get(row.original, 'target.phone')
      },
      {
        accessorKey: 'target',
        id: 'target_carrier',
        header: getMessage('company'),
        cell: ({ row }) => get(row.original, 'target.carrier.name')
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
        accessorKey: 'created_by',
        header: getMessage('createdBy')
      },
      {
        accessorKey: 'created_at',
        header: getMessage('date'),
        cell: ({ getValue }) =>
          format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
      },
      {
        accessorKey: 'target',
        id: 'target_technique',
        header: getMessage('technique'),
        cell: ({ row }) => get(row.original, 'target.technique.name', '')
      },
      {
        accessorKey: 'line_status',
        header: getMessage('status'),
        cell: ({ getValue }) => (
          <div>
            <p
              className={clsx(
                'px-1 py-1 rounded-3xl text-white text-center text-sm leading-none font-light',
                colorsStatus[getValue<string>()]
              )}
            >
              {getMessage(getValue<string>())}
            </p>
          </div>
        ),
        meta: {
          columnFilters: {
            multiple: true,
            options: [
              {
                name: formatMessage(statusMessages.assigned),
                value: 'assigned'
              },
              {
                name: formatMessage(statusMessages.available),
                value: 'available'
              },
              {
                name: formatMessage(statusMessages.quarantine),
                value: 'quarantine'
              },
              {
                name: formatMessage(statusMessages.maintenance),
                value: 'maintenance'
              }
            ],
            onChange: (value) =>
              overflowLineActions?.get({ line_status: value })
          }
        }
      },
      {
        accessorKey: 'target.end_date',
        header: getMessage('releaseDate'),
        cell: ({ row }) => {
          const value = get(row.original, 'target.end_date')

          if (value) return format(new Date(value), 'dd/MM/yyyy - HH:mm')

          return ''
        }
      },
      {
        header: getMessage('actions'),
        enableSorting: false,
        accessorKey: 'status',
        cell: ({ getValue, row }) => (
          <div className="flex gap-2 items-center">
            <Tooltip
              content={getMessage(getValue() ? 'disable' : 'enable')}
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <Switch
                color="primary"
                size="sm"
                stopPropagation
                disabled={ability.cannot(ACTION.UPDATE, SUBJECT.OVERFLOW_LINES)}
                value={getValue<boolean>() ?? false}
                onChange={() => setSelected(row.original)}
              />
            </Tooltip>
            <Tooltip
              content="Ver historial de línea"
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <IconButton
                tooltip={getMessage('history')}
                className="text-muted hover:text-primary"
                onClick={() => lineHistoryActions?.setLineId(row.original.id)}
              >
                <DocumentMagnifyingGlassIcon className="w-4 h-4" />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],
    [ability.rules]
  )

  useEffect(() => {
    overflowLineActions?.get({ page: 1 }, true)
    auditActions?.genAudit(ModuleAuditsTypes.AuditableModules.OVERFLOW_LINES)
  }, [])

  return (
    <>
      <EditOverflowLineDrawer
        open={open}
        overflowLine={selected}
        onClose={toggle}
      />
      <DisableOverflowLineDialog
        open={openDisable}
        data={selected}
        ids={selectedIds}
        onSuccess={() => {
          tableRef.current?.setRowSelection({})
          setSelected(null)
          setSelectedIds([])
          setOpenDisable(false)
        }}
        onClose={() => {
          setSelected(null)
          setOpenDisable(false)
        }}
      />
      <LineHistory />
      <Table
        tableRef={tableRef}
        columns={columns}
        data={data}
        manualSorting={{
          onSortingChange: (sort) => overflowLineActions?.get({ sort }),
          sorting: pagination.sort
        }}
        withCheckbox
        onRowClicked={(row) => {
          if (ability.cannot(ACTION.UPDATE, SUBJECT.OVERFLOW_LINES)) return
          setSelected(row)
          toggle()
        }}
        manualLimit={{
          onChangeLimit: (page, limit) =>
            overflowLineActions?.get({ page: page + 1, limit }),
          options: pagination.limitOptions ?? [15]
        }}
        pageSize={pagination.limit}
        manualPagination={{
          currentPage: pagination.page,
          totalRecords: pagination.totalRecords,
          onChange: (page) => overflowLineActions?.get({ page: page + 1 })
        }}
        actionsForSelectedItems={[
          {
            name: 'disable',
            tooltip: formatMessage(actionsMessages.disable),
            action: (items: any) => {
              setSelected(null)
              setSelectedIds(items.map((item) => item.id))
              setOpenDisable(true)
            },
            Icon: NoSymbolIcon,
            disabled:
              ability.cannot(ACTION.CREATE, SUBJECT.OVERFLOW_LINES) ||
              ability.cannot(ACTION.READ, SUBJECT.ACQUISITION_MEDIUMS)
          }
        ]}
      />
    </>
  )
}

export default DataTable
