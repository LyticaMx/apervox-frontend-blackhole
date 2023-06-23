import { useState, ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { format, formatDistanceToNow } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'

import { TrashIcon } from '@heroicons/react/24/outline'

import { pathRoute } from 'router/routes'

import { useTechniques } from 'context/Techniques'
import { useTechnique } from 'context/Technique'

import Table from 'components/Table'
import Tooltip from 'components/Tooltip'
import PriorityLabel from 'components/Priority/PriorityLabel'
import StatusTag from 'components/Status/StatusTag'
import IconButton from 'components/Button/IconButton'
import ActionNotification from 'components/Dialog/ActionNotification'

import { NonEmptyArray } from 'types/utils'
import { Technique, Turn } from 'types/technique'
import { Priority } from 'types/priority'
import { Status } from 'types/status'

import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'

import { generalMessages } from 'globalMessages'

import DeleteTechinqueDialog, { EliminationType } from './DeleteTechinqueDialog'
import { techniquesDeleteDialogMessages, techniquesMessages } from '../messages'
import { useLanguage } from 'context/Language'
import { useIntl } from 'react-intl'

const TechniqueList = (): ReactElement => {
  const history = useHistory()
  const { formatMessage } = useIntl()
  const { data, pagination, actions: techniquesActions } = useTechniques()
  const { actions } = useTechnique()
  const getMessage = useFormatMessage(generalMessages)
  const getDeleteMessage = useFormatMessage(techniquesDeleteDialogMessages)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openActionNotification, setOpenActionNotification] = useState(false)
  const [techinqueToDelete, setTechinqueToDelete] = useState<string | null>(
    null
  )
  const { locale } = useLanguage()

  const handleOpenDeleteDialog = (e): void => {
    e.preventDefault()
    setOpenDeleteDialog(true)
  }
  const handleCloseDeleteDialog = (): void => {
    setOpenDeleteDialog(false)
    setTechinqueToDelete(null)
  }

  const handleDeleteTechinque = (eliminationType: EliminationType): void => {
    setOpenDeleteDialog(false)
    setOpenActionNotification(true)
    console.log('techinque_id: ', techinqueToDelete, eliminationType)
  }

  const handleClick = (item: Technique): void => {
    actions?.setTechnique(item)
    history.push(pathRoute.technique)
  }
  const normalModeColumns: NonEmptyArray<ColumnDef<Technique>> = [
    {
      accessorKey: 'name',
      header: getMessage('name')
    },
    {
      accessorKey: 'created_at',
      header: getMessage('registrationDate'),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'expires_at',
      header: getMessage('effectiveDate'),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'registered_by',
      header: getMessage('registeredBy')
    },
    {
      id: 'time_on_platform',
      accessorKey: 'created_at',
      header: getMessage('timeOnPlatform'),
      cell: ({ getValue }) => {
        const time = formatDistanceToNow(new Date(getValue<string>()), {
          locale
        })

        return <>{`${time.charAt(0).toUpperCase()}${time.substring(1)}`}</>
      }
    },
    {
      accessorKey: 'priority',
      header: getMessage('priority'),
      cell: ({ getValue }) => {
        const priority = getValue<Priority>()

        return <PriorityLabel value={priority} />
      },
      meta: {
        columnFilters: {
          multiple: true,
          options: [
            { name: getMessage('lowPriority'), value: 'low' },
            { name: getMessage('mediumPriority'), value: 'medium' },
            { name: getMessage('highPriority'), value: 'high' },
            { name: getMessage('urgentPriority'), value: 'urgent' }
          ],
          onChange: (value) => techniquesActions?.get({ priority: value })
        }
      }
    },
    {
      accessorKey: 'status',
      header: getMessage('status'),
      cell: ({ getValue }) => {
        const status = getValue<Status>()

        return <StatusTag value={status} />
      },
      meta: {
        columnFilters: {
          multiple: true,
          options: [
            { name: getMessage('activeStatus'), value: 'active' },
            { name: getMessage('toCompleteStatus'), value: 'concluding' },
            { name: getMessage('completedStatus'), value: 'concluded' }
          ],
          onChange: (value) => techniquesActions?.get({ status: value })
        }
      }
    },
    {
      accessorKey: 'attention_turn',
      header: getMessage('turnOfAttention'),
      cell: ({ getValue }) => {
        const turn = getValue<Turn>()

        return getMessage(`${turn}`)
      },
      meta: {
        columnFilters: {
          multiple: true,
          options: [
            { name: getMessage('morning'), value: 'morning' },
            { name: getMessage('afternoon'), value: 'afternoon' },
            { name: getMessage('night'), value: 'night' }
          ],
          onChange: (value) => techniquesActions?.get({ turn: value })
        }
      }
    },
    {
      accessorKey: 'total_target',
      header: formatMessage(techniquesMessages.totalTargets),
      meta: {
        columnFilters: {
          options: [
            {
              name: formatMessage(techniquesMessages.withTargets),
              value: 'withTargets'
            },
            {
              name: formatMessage(techniquesMessages.withoutTargets),
              value: 'withoutTargets'
            },
            { name: getMessage('both'), value: 'both' }
          ],
          onChange: (value) => {
            let withTargets
            if (value[0] === 'withTargets') withTargets = true
            else if (value[0] === 'withoutTargets') withTargets = false
            techniquesActions?.get({ withTargets })
          }
        }
      }
    },
    {
      accessorKey: 'id',
      enableSorting: false,
      header: getMessage('action'),
      cell: ({ getValue }) => {
        const id = getValue<string>()

        return (
          <div className="flex items-center justify-center">
            <Tooltip
              content={getMessage('delete')}
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <IconButton
                onClick={(e) => {
                  e?.stopPropagation()
                  handleOpenDeleteDialog(e)
                  setTechinqueToDelete(id)
                }}
                className="text-muted hover:text-primary"
              >
                <TrashIcon className="h-5 w-5 mx-1" />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    }
  ]

  const columns = useTableColumns<Technique>(() => normalModeColumns)

  return (
    <>
      <Table
        columns={columns}
        data={data}
        className="overflow-x-auto shadow rounded-lg"
        manualSorting={{
          onSortingChange: (sort) => techniquesActions?.get({ sort }),
          sorting: pagination.sort
        }}
        maxHeight={500}
        withCheckbox
        manualLimit={{
          options: [15, 25, 50, 100],
          onChangeLimit: (page, limit) =>
            techniquesActions?.get({ page: page + 1, limit })
        }}
        pageSize={pagination.limit}
        manualPagination={{
          currentPage: pagination.page,
          totalRecords: pagination.totalRecords,
          onChange: (page) => techniquesActions?.get({ page: page + 1 })
        }}
        actionsForSelectedItems={[
          {
            name: 'Eliminar',
            action: (items) => {
              console.log(
                `onDeleteTechniquesFromWorkGroup(${items.map(
                  (user) => user.id
                )})`
              )
            },
            Icon: TrashIcon
          }
        ]}
        onRowClicked={handleClick}
      />
      <DeleteTechinqueDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onAccept={handleDeleteTechinque}
      />
      <ActionNotification
        open={openActionNotification}
        title={getDeleteMessage('title')}
        onAccept={() => setOpenActionNotification(false)}
      />
    </>
  )
}

export default TechniqueList
