import { useState, ReactElement } from 'react'

import { format } from 'date-fns'
import { SortingState, ColumnDef } from '@tanstack/react-table'

import { TrashIcon } from '@heroicons/react/24/outline'

import Table from 'components/Table'
import Tooltip from 'components/Tooltip'
import PriorityLabel from 'components/Priority/PriorityLabel'
import StatusTag from 'components/Status/StatusTag'
import IconButton from 'components/Button/IconButton'

import { NonEmptyArray } from 'types/utils'
import { Technique, Turn } from 'types/technique'
import { Priority } from 'types/priority'
import { Status } from 'types/status'

import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'

import { generalMessages } from 'globalMessages'

interface Props {
  data: Technique[]
  onClick?: (item: Technique) => void
  onDelete?: (item: Technique) => void
}
const TechniqueList = (props: Props): ReactElement => {
  const getMessage = useFormatMessage(generalMessages)

  const [sortingState, setSortingState] = useState<SortingState>([])

  const handleClick = (item: Technique): void => {
    if (props.onClick) {
      props.onClick(item)
    }
  }

  const normalModeColumns: NonEmptyArray<ColumnDef<Technique>> = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
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
      accessorKey: 'time_on_platform',
      header: getMessage('timeOnPlatform')
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
                  if (props.onDelete) {
                    props.onDelete(row.original)
                  }
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
        data={props.data}
        className="overflow-x-auto shadow rounded-lg"
        manualSorting={{
          onSortingChange: setSortingState,
          sorting: sortingState
        }}
        maxHeight={500}
        withCheckbox
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
    </>
  )
}

export default TechniqueList
