import { ReactElement, useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { useIntl } from 'react-intl'
import { NoSymbolIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'

import Table from 'components/Table'
import Tooltip from 'components/Tooltip'
import Switch from 'components/Form/Switch'

import useTableColumns from 'hooks/useTableColumns'

import {
  actionsMessages,
  generalMessages,
  platformMessages
} from 'globalMessages'
import { tableMessages } from './messages'

import { useVerificationLine } from 'context/VerificationLines/useVerificationLine'
import { VerificationLine } from 'types/verificationLine'

import EditVerificationLineDrawer from './components/EditVerificationLineDrawer'
import Tabs from './components/Tabs'
import DisableVerificationLineDialog from './components/DisableVerificationLineDialog'
import VerificationHeader from './components/VerificationHeader'

const Verification = (): ReactElement => {
  const { formatMessage } = useIntl()

  const tableRef = useRef<any>(undefined)
  const [openDisable, setOpenDisable] = useState(false)
  const [selected, setSelected] = useState<VerificationLine | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const [openEdit, setOpenEdit] = useState(false)
  const { data, pagination, actions } = useVerificationLine()
  console.log(
    '🚀 ~ file: Verification.tsx:37 ~ Verification ~ pagination:',
    pagination
  )

  const columns = useTableColumns<VerificationLine>(() => [
    {
      header: formatMessage(platformMessages.phoneNumber),
      accessorKey: 'phone'
    },
    {
      header: formatMessage(tableMessages.createdBy),
      enableSorting: false,
      accessorKey: 'created_by'
    },
    {
      header: formatMessage(tableMessages.date),
      accessorKey: 'created_at',
      cell: ({ getValue }) =>
        format(new Date(getValue<string>() ?? ''), 'dd/MM/yyyy hh:mm')
    },
    {
      header: formatMessage(generalMessages.actions),
      enableSorting: false,
      accessorKey: 'id',
      cell: ({ getValue, cell, row }) => {
        const isActive = cell.row.original.status

        return (
          <div className="flex pt-1" onClick={(e) => e.stopPropagation()}>
            <Tooltip
              content={formatMessage(
                actionsMessages[isActive ? 'disable' : 'enable']
              )}
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <Switch
                size="sm"
                value={isActive}
                onChange={() => {
                  setSelectedIds([])
                  setSelected(row.original)
                  setOpenDisable(true)
                }}
                color="primary"
              />
            </Tooltip>

            <Tooltip
              content={formatMessage(generalMessages.history)}
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <RectangleGroupIcon className="h-5 w-5 mx-1 ml-2 text-muted hover:text-primary cursor-pointer" />
            </Tooltip>
          </div>
        )
      }
    }
  ])

  useEffect(() => {
    actions?.get({}, true)
  }, [])

  return (
    <div>
      <Tabs />
      <VerificationHeader />

      <EditVerificationLineDrawer
        verificationLine={selected}
        onClose={() => setOpenEdit(false)}
        open={openEdit}
      />
      <DisableVerificationLineDialog
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
      <div className="mt-2">
        <Table
          tableRef={tableRef}
          columns={columns}
          data={data}
          maxHeight={500}
          withCheckbox
          onRowClicked={(row) => {
            setSelected(row)
            setOpenEdit(true)
          }}
          manualSorting={{
            onSortingChange: (sort) => actions?.get({ sort }),
            sorting: pagination.sort
          }}
          pageSize={pagination.limit}
          manualLimit={{
            onChangeLimit: (page, limit) =>
              actions?.get({ page: page + 1, limit }),
            options: pagination.limitOptions ?? [15]
          }}
          manualPagination={{
            currentPage: pagination.page,
            totalRecords: pagination.totalRecords,
            onChange: (page) => actions?.get({ page: page + 1 })
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
              Icon: NoSymbolIcon
            }
          ]}
        />
      </div>
    </div>
  )
}

export default Verification
