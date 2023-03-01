import { useState, ReactElement } from 'react'
import { SortingState } from '@tanstack/react-table'
import { TrashIcon } from '@heroicons/react/24/outline'
import { generalMessages } from 'globalMessages'
import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { useWorkGroups } from 'context/WorkGroups'
import { WorkGroupUser } from 'types/workgroup'
import { Status } from 'types/status'
import Table from 'components/Table'
import Tooltip from 'components/Tooltip'
import StatusTag from 'components/Status/StatusTag'

const AssociatedUserList = (): ReactElement => {
  const getMessage = useFormatMessage(generalMessages)
  const [sortingState, setSortingState] = useState<SortingState>([])
  const { associatedUsers } = useWorkGroups()

  const columns = useTableColumns<WorkGroupUser>(() => [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: getMessage('name')
    },
    {
      accessorKey: 'surnames',
      header: getMessage('surnames')
    },
    {
      accessorKey: 'username',
      header: getMessage('username')
    },
    {
      accessorKey: 'groups',
      header: getMessage('groups')
    },
    {
      accessorKey: 'role',
      header: getMessage('profile')
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
      accessorKey: 'id',
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
              <TrashIcon
                className="h-5 w-5 mx-1 text-muted hover:text-primary cursor-pointer"
                onClick={() => console.log(`onDeleteUserFromWorkGroup(${id})`)}
              />
            </Tooltip>
          </div>
        )
      }
    }
  ])

  return (
    <Table
      columns={columns}
      data={associatedUsers}
      className="overflow-x-auto shadow"
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
              `onDeleteUsersFromWorkGroup(${items.map((user) => user.id)})`
            )
          },
          Icon: TrashIcon
        }
      ]}
    />
  )
}

export default AssociatedUserList
