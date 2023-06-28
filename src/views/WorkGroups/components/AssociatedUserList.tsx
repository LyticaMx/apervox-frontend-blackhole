import { ReactElement } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { WorkGroupUser } from 'types/workgroup'
import { Status } from 'types/status'
import Table from 'components/Table'
import Tooltip from 'components/Tooltip'
import StatusTag from 'components/Status/StatusTag'
import { useWorkGroups } from 'context/WorkGroups'
import useToast from 'hooks/useToast'
import { workGroupsUsersListMessages } from '../messages'

const AssociatedUserList = (): ReactElement => {
  const getMessage = useFormatMessage(workGroupsUsersListMessages)
  const { associatedUsers, actions, usersPagination, selected } =
    useWorkGroups()
  const { launchToast } = useToast()

  const columns = useTableColumns<WorkGroupUser>(
    () => [
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
        header: getMessage('groups'),
        enableSorting: false
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
        enableSorting: false,
        cell: ({ getValue, table }) => {
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
                <button
                  onClick={async (e) => {
                    const deleted = await actions?.deleteUsersOfWorkGroup([id])
                    if (deleted) {
                      await actions?.getWorkGroupUsers({ page: 1 })
                      await actions?.getWorkGroups()
                      launchToast({
                        title: getMessage('deletedUsersSuccess', {
                          total: 1
                        }),
                        type: 'Success'
                      })
                      return true
                    }
                  }}
                  className="text-muted enabled:hover:text-primary mx-1"
                  disabled={
                    table.getIsSomeRowsSelected() ||
                    table.getIsAllRowsSelected()
                  }
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </Tooltip>
            </div>
          )
        }
      }
    ],
    [selected.id] //! Recordar que cada que pases algo a la tabla actualizar las dependencias
  )

  return (
    <Table
      columns={columns}
      data={associatedUsers}
      className="overflow-x-auto shadow rounded-lg"
      manualSorting={{
        onSortingChange: (sort) => actions?.getWorkGroupUsers({ sort }),
        sorting: usersPagination.sort
      }}
      maxHeight={500}
      withCheckbox
      pageSize={usersPagination.limit}
      manualPagination={{
        currentPage: usersPagination.page,
        totalRecords: usersPagination.totalRecords,
        onChange: (page) => actions?.getWorkGroupUsers({ page: page + 1 })
      }}
      manualLimit={{
        options: [15, 25, 50, 100],
        onChangeLimit: (page, limit) =>
          actions?.getWorkGroupUsers({ page: page + 1, limit })
      }}
      actionsForSelectedItems={[
        {
          name: 'Eliminar',
          action: async (items) => {
            const deleted = await actions?.deleteUsersOfWorkGroup(
              items.map((datum) => datum.id)
            )
            if (deleted) {
              await actions?.getWorkGroupUsers({ page: 1 })
              await actions?.getWorkGroups()
              launchToast({
                title: getMessage('deletedUsersSuccess', {
                  total: items.length
                }),
                type: 'Success'
              })
              return true
            }
          },
          Icon: TrashIcon
        }
      ]}
    />
  )
}

export default AssociatedUserList
