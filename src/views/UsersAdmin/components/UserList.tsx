import { useEffect, ReactElement } from 'react'
import { format } from 'date-fns'
import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import FloatingActions from 'components/FloatingActions'
import Table from 'components/Table'
import Tag from 'components/Tag'
import { generalMessages } from 'globalMessages'
import Typography from 'components/Typography'
import {
  TrashIcon,
  NoSymbolIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useUsers } from 'context/Users'
import { User } from 'types/user'
import clsx from 'clsx'

const colorByStatus = {
  enabled: 'bg-green-600',
  disabled: 'bg-red-600',
  banned: 'bg-gray-600'
}

interface Props {
  onSelectUser: (user: User) => void
  onDeleteUser: (ids: string[]) => void
  onDisableUser: (ids: string[]) => void
  onRemoteLogOffUser: (ids: string[]) => void
  onUnlockUser: (id: string) => void
  onResetPasswordUser: (id: string) => void
}

const UserList = ({
  onSelectUser,
  onDeleteUser,
  onDisableUser,
  onRemoteLogOffUser,
  onUnlockUser,
  onResetPasswordUser
}: Props): ReactElement => {
  const getMessage = useFormatMessage(generalMessages)
  const { listOfUsers, usersPagination, actions } = useUsers()

  useEffect(() => {
    actions?.getUsers()
  }, [])

  const columns = useTableColumns<User>(() => [
    {
      accessorKey: 'name',
      header: getMessage('name')
    },
    {
      accessorKey: 'lastName',
      header: getMessage('surnames')
    },
    {
      accessorKey: 'username',
      header: getMessage('user')
    },
    {
      accessorKey: 'groups',
      header: getMessage('groups'),
      cell: ({ getValue }) => getValue<string[]>().join(', ')
    },
    {
      accessorKey: 'role',
      header: getMessage('profile')
    },
    {
      accessorKey: 'createdBy',
      header: getMessage('registeredBy')
    },
    {
      accessorKey: 'sessions',
      header: getMessage('session'),
      cell: ({ getValue }) => {
        const sessions = getValue<number>()
        const hasSessions = sessions > 0

        return (
          <div className="flex items-center">
            <Typography className="mr-2" variant="body2">
              {getMessage(hasSessions ? 'logguedIn' : 'notLogguedIn')}
            </Typography>

            {hasSessions && (
              <Tag
                label={sessions.toString()}
                className={'px-2 py-1'}
                variant="caption"
                roundedClassName="rounded-md"
              />
            )}
          </div>
        )
      }
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: getMessage('status'),
      cell: ({ getValue }) => {
        const status = getValue<string>()
        return (
          <Tag
            label={getMessage(status)}
            className={clsx(
              'px-4 py-1 w-32 justify-center',
              colorByStatus[status]
            )}
            labelColorClassName="text-white"
            variant="caption"
          />
        )
      }
    },
    {
      accessorKey: 'createdOn',
      header: getMessage('date'),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'dd/MM/yyyy')
    },
    {
      accessorKey: 'id',
      header: getMessage('action'),
      enableSorting: false,
      cell: ({ getValue, cell }) => {
        const id = getValue<string>()
        const status = cell.row.original.status

        return (
          <FloatingActions
            actions={[
              {
                label: 'Restablecer contraseña',
                onClick: () => {
                  onResetPasswordUser(id)
                }
              },
              {
                label: 'Desbloquear usuario',
                disabled: status !== 'banned',
                onClick: () => {
                  onUnlockUser(id)
                }
              },
              {
                label: 'Deshabilitar usuario',
                disabled: status === 'banned',
                onClick: () => {
                  onDisableUser([id])
                }
              },
              {
                label: 'Cerrar sesión',
                onClick: () => {
                  onRemoteLogOffUser([id])
                }
              },
              {
                label: 'Eliminar',
                className: 'text-red-500',
                onClick: () => {
                  onDeleteUser([id])
                }
              }
            ]}
          />
        )
      }
    }
  ])

  return (
    <div className="flex-1">
      <Table
        columns={columns}
        data={listOfUsers}
        className="overflow-x-auto shadow"
        manualSorting={{
          onSortingChange: (sort) => actions?.getUsers({ sort }),
          sorting: usersPagination.sort
        }}
        onRowClicked={(row) => onSelectUser(row)}
        maxHeight={500}
        manualLimit={{
          options: [15, 25, 50, 100],
          onChangeLimit: (page, limit) =>
            actions?.getUsers({
              page: page + 1,
              limit
            })
        }}
        pageSize={usersPagination.limit}
        manualPagination={{
          currentPage: usersPagination.page,
          totalRecords: usersPagination.totalRecords,
          onChange: (page) => actions?.getUsers({ page: page + 1 })
        }}
        withCheckbox
        actionsForSelectedItems={[
          {
            name: 'Eliminar',
            action: (items) => {
              onDeleteUser(items.map((user) => user.id ?? ''))
            },
            Icon: TrashIcon
          },
          {
            name: 'Deshabilitar',
            action: (items) => {
              onDisableUser(items.map((user) => user.id ?? ''))
            },
            Icon: NoSymbolIcon
          },
          {
            name: 'Cerrar sesión',
            action: (items) => {
              onRemoteLogOffUser(items.map((user) => user.id ?? ''))
            },
            Icon: ArrowLeftOnRectangleIcon
          }
        ]}
      />
    </div>
  )
}

export default UserList
