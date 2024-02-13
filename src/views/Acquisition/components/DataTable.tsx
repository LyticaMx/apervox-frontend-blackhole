import { NoSymbolIcon } from '@heroicons/react/24/outline'
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
import { useIntl } from 'react-intl'
import { actionsMessages } from 'globalMessages'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import LineHistory from './LineHistory'
import { useLineHistory } from 'context/LineHistory'
import FloatingActions from 'components/FloatingActions'
import QuarantineDialog from './QuarantineDialog'
import MaintenanceDialog from './MaintenanceDialog'

interface UpdateLine {
  id: string
  release: boolean
  phone: string
}

const DataTable = (): ReactElement => {
  const { formatMessage } = useIntl()
  const getMessage = useFormatMessage(tableMessages)
  const {
    data,
    pagination,
    actions: overflowLineActions,
    staticFilter
  } = useOverflowLine()
  const { actions: lineHistoryActions } = useLineHistory()
  const { actions: auditActions } = useModuleAudits()
  const ability = useAbility()
  const [quarantine, setQuarantine] = useState<UpdateLine>({
    id: '',
    phone: '',
    release: false
  })
  const [maintenance, setMaintenance] = useState<UpdateLine>({
    id: '',
    phone: '',
    release: false
  })

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
            selected: staticFilter.line_status,
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
        cell: ({ row }) => {
          const status = row.original.line_status
          const phone = row.original.phone
          const id = row.original.id ?? ''

          return (
            <FloatingActions
              actions={[
                {
                  label: getMessage('history'),
                  onClick: () =>
                    lineHistoryActions?.setLine({
                      id: row.original.id ?? '',
                      phone: row.original.phone
                    })
                },
                {
                  label: getMessage('updateQuarantine', { status }),
                  onClick: () =>
                    setQuarantine({
                      id,
                      phone,
                      release: status === 'quarantine'
                    }),
                  disabled:
                    status === 'assigned' ||
                    status === 'maintenance' ||
                    ability.cannot(ACTION.UPDATE, SUBJECT.OVERFLOW_LINES)
                },
                {
                  label: getMessage('updateMaintenance', { status }),
                  onClick: () =>
                    setMaintenance({
                      id,
                      phone,
                      release: status === 'maintenance'
                    }),
                  disabled:
                    status === 'assigned' ||
                    status === 'quarantine' ||
                    ability.cannot(ACTION.UPDATE, SUBJECT.OVERFLOW_LINES)
                }
              ]}
            />
          )
        }
      }
    ],
    [ability.rules, overflowLineActions?.get]
  )

  const handleQuarantineClose = (): void =>
    setQuarantine({ id: '', phone: '', release: false })
  const handleMaintenanceClose = (): void =>
    setMaintenance({ id: '', phone: '', release: false })

  useEffect(() => {
    overflowLineActions?.get({ page: 1 }, true)
    auditActions?.genAudit(ModuleAuditsTypes.AuditableModules.OVERFLOW_LINES)
  }, [])

  return (
    <>
      <QuarantineDialog
        id={quarantine.id}
        release={quarantine.release}
        phone={quarantine.phone}
        onClose={handleQuarantineClose}
        onSuccess={handleQuarantineClose}
      />
      <MaintenanceDialog
        id={maintenance.id}
        release={maintenance.release}
        phone={maintenance.phone}
        onClose={handleMaintenanceClose}
        onSuccess={handleMaintenanceClose}
      />
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
