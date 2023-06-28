import { ReactElement } from 'react'

import { format, formatDistanceToNow } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'

import { TrashIcon } from '@heroicons/react/24/outline'

import Table from 'components/Table'
import Tooltip from 'components/Tooltip'
import PriorityLabel from 'components/Priority/PriorityLabel'
import StatusTag from 'components/Status/StatusTag'
import IconButton from 'components/Button/IconButton'

import { NonEmptyArray } from 'types/utils'
import { Turn } from 'types/technique'
import { Priority } from 'types/priority'
import { Status } from 'types/status'

import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'

import { generalMessages } from 'globalMessages'
import { useWorkGroups } from 'context/WorkGroups'
import { WorkGroupTechnique } from 'types/workgroup'
import { useLanguage } from 'context/Language'

const TechniqueList = (): ReactElement => {
  const {
    associatedTechniques,
    actions: techniquesActions,
    techniquesPagination
  } = useWorkGroups()
  const { locale } = useLanguage()
  const getMessage = useFormatMessage(generalMessages)

  const normalModeColumns: NonEmptyArray<ColumnDef<WorkGroupTechnique>> = [
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
      }
    },
    {
      accessorKey: 'status',
      header: getMessage('status'),
      cell: ({ getValue }) => {
        const status = getValue<Status>()

        return <StatusTag value={status} />
      }
    },
    {
      accessorKey: 'turn_of_attention',
      header: getMessage('turnOfAttention'),
      cell: ({ getValue }) => {
        const turn = getValue<Turn>()

        return getMessage(`${turn}`)
      }
    },
    {
      accessorKey: 'total_objective',
      header: getMessage('totalObjective')
    },
    {
      accessorKey: 'id',
      enableSorting: false,
      header: getMessage('action'),
      cell: ({ row }) => {
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
                  console.log('Borrame')
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

  const columns = useTableColumns<WorkGroupTechnique>(() => normalModeColumns)

  return (
    <Table
      columns={columns}
      data={associatedTechniques}
      className="overflow-x-auto shadow rounded-lg"
      manualSorting={{
        onSortingChange: (sort) =>
          techniquesActions?.getWorkGroupTechniques({ sort }),
        sorting: techniquesPagination.sort
      }}
      maxHeight={500}
      withCheckbox
      pageSize={techniquesPagination.limit}
      manualPagination={{
        currentPage: techniquesPagination.page,
        totalRecords: techniquesPagination.totalRecords,
        onChange: (page) =>
          techniquesActions?.getWorkGroupTechniques({ page: page + 1 })
      }}
      manualLimit={{
        options: [15, 25, 50, 100],
        onChangeLimit: (page, limit) =>
          techniquesActions?.getWorkGroupTechniques({ page: page + 1, limit })
      }}
      actionsForSelectedItems={[
        {
          name: 'Eliminar',
          tooltip: getMessage('delete'),
          action: async (items) => {
            console.log(
              `onDeleteTechniquesFromWorkGroup(${items.map((user) => user.id)})`
            )
          },
          Icon: TrashIcon
        }
      ]}
    />
  )
}

export default TechniqueList
