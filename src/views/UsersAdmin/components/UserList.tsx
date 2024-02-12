import { useEffect, ReactElement } from 'react'
import { format } from 'date-fns'
import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import FloatingActions from 'components/FloatingActions'
import Table from 'components/Table'
import Tag from 'components/Tag'
import Typography from 'components/Typography'
import {
  TrashIcon,
  NoSymbolIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useUsers } from 'context/Users'
import { User, UserGroup } from 'types/user'
import clsx from 'clsx'
import { userListMessages } from '../messages'
import { useAuth } from 'context/Auth'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

const colorByStatus = {
  enabled: 'bg-green-600',
  disabled: 'bg-red-600',
  banned: 'bg-gray-600'
}

interface Props {
  onSelectUser: (user: User) => void
  onDeleteUser: (ids: string[]) => Promise<boolean>
  onDisableUser: (ids: string[], status?: string) => void
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
  const getMessage = useFormatMessage(userListMessages)
  const { listOfUsers, usersPagination, staticFilter, actions } = useUsers()
  const { auth } = useAuth()
  const ability = useAbility()

  useEffect(() => {
    actions?.getUsers({}, true)
  }, [])

  const columns = useTableColumns<User>(
    () => [
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
        cell: ({ getValue }) =>
          getValue<UserGroup[]>()
            .map((item) => item.name)
            .join(', '),
        enableSorting: false
      },
      {
        accessorKey: 'role',
        header: getMessage('role')
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
                <span
                  className={clsx(
                    'mr-1',
                    hasSessions ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  &#9679;
                </span>
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
        },
        enableSorting: false,
        meta: {
          columnFilters: {
            onChange: async (values) => {
              await actions?.getUsers({ sessions: values })
            },
            selected: staticFilter.sessions?.[0],
            options: [
              {
                name: getMessage('logguedIn'),
                value: 'logged'
              },
              {
                name: getMessage('notLogguedIn'),
                value: 'not logged'
              },
              {
                name: getMessage('both'),
                value: 'both'
              }
            ]
          }
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
        },
        meta: {
          columnFilters: {
            selected: staticFilter.status?.[0],
            onChange: async (values) =>
              await actions?.getUsers({ status: values }),
            options: [
              {
                name: getMessage('enabled'),
                value: 'enabled'
              },
              {
                name: getMessage('disabled'),
                value: 'disabled'
              },
              {
                name: getMessage('both'),
                value: 'both'
              }
            ]
          }
        }
      },
      {
        accessorKey: 'createdOn',
        header: getMessage('registrationDate'),
        cell: ({ getValue }) =>
          format(new Date(getValue<string>()), 'dd/MM/yyyy')
      },
      {
        accessorKey: 'id',
        header: getMessage('action'),
        enableSorting: false,
        cell: ({ getValue, cell, table }) => {
          const id = getValue<string>()
          const status = cell.row.original.status

          return (
            <FloatingActions
              actions={[
                {
                  label: getMessage('restorePassword'),
                  onClick: () => {
                    onResetPasswordUser(id)
                  },
                  disabled: ability.cannot(ACTION.UPDATE, SUBJECT.SESSIONS)
                },
                {
                  label: getMessage('unlockUser'),
                  disabled:
                    status !== 'banned' ||
                    table.getIsSomePageRowsSelected() ||
                    table.getIsAllRowsSelected() ||
                    ability.cannot(ACTION.UPDATE, SUBJECT.USERS),
                  onClick: () => {
                    onUnlockUser(id)
                  }
                },
                {
                  label: getMessage('disableUser', { disabled: status }),
                  disabled:
                    status === 'banned' ||
                    table.getIsSomePageRowsSelected() ||
                    table.getIsAllRowsSelected() ||
                    ability.cannot(ACTION.UPDATE, SUBJECT.USERS),
                  onClick: () => {
                    onDisableUser([id], cell.row.original.status)
                  }
                },
                ...(auth.profile.id === id
                  ? []
                  : [
                      {
                        label: getMessage('closeSession'),
                        disabled:
                          table.getIsSomePageRowsSelected() ||
                          table.getIsAllRowsSelected() ||
                          ability.cannot(ACTION.DELETE, SUBJECT.USERS),
                        onClick: () => {
                          onRemoteLogOffUser([id])
                        }
                      }
                    ]),
                {
                  label: getMessage('delete'),
                  className: 'text-red-500',
                  disabled:
                    table.getIsSomePageRowsSelected() ||
                    table.getIsAllRowsSelected() ||
                    ability.cannot(ACTION.DELETE, SUBJECT.USERS),
                  onClick: () => {
                    onDeleteUser([id])
                  }
                }
              ]}
            />
          )
        }
      }
    ],
    [actions?.getUsers, ability.rules]
  )

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
        onRowClicked={(row) => {
          if (ability.can(ACTION.UPDATE, SUBJECT.USERS)) onSelectUser(row)
        }}
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
            name: 'deleteUser',
            tooltip: getMessage('delete'),
            action: async (items) =>
              await onDeleteUser(items.map((user) => user.id ?? '')),
            Icon: TrashIcon,
            disabled: ability.cannot(ACTION.DELETE, SUBJECT.USERS)
          },
          {
            name: 'disableUser',
            tooltip: getMessage('disableSelectedUsers'),
            action: (items) => {
              onDisableUser(items.map((user) => user.id ?? ''))
            },
            Icon: NoSymbolIcon,
            disabled: ability.cannot(ACTION.UPDATE, SUBJECT.USERS)
          },
          {
            name: 'closeSession',
            tooltip: getMessage('closeSession'),
            action: (items) => {
              onRemoteLogOffUser(items.map((user) => user.id ?? ''))
            },
            Icon: ArrowLeftOnRectangleIcon,
            disabled: ability.cannot(ACTION.DELETE, SUBJECT.SESSIONS)
          }
        ]}
      />
    </div>
  )
}

export default UserList
