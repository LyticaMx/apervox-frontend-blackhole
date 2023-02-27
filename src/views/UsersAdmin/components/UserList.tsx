import { useState, useEffect, ReactElement } from 'react'
import { SortingState } from '@tanstack/react-table'
import { format } from 'date-fns'
import { sortBy } from 'lodash'
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

export interface Group {
  value: string
  text: string
}

export interface User {
  id: string
  name: string
  surnames: string
  username: string
  email: string
  groups: Group[]
  position: string
  userRol: string
  extension: string
  createdOn: Date
  createdBy: string
  session: SessionInfo
}

export interface SessionInfo {
  activeSessions: Number
  status: string
}

const colorByStatus = {
  active: 'green-600',
  inactive: 'red-600',
  banned: 'gray-600'
}

const mockData: User[] = [
  {
    id: '001',
    name: 'Armando',
    surnames: 'Albor Chavez',
    username: 'armandoalbor',
    email: 'armandoalbor@gmail.com',
    groups: [
      {
        value: 'g1',
        text: 'Grupo 1'
      },
      {
        value: 'g2',
        text: 'Grupo 2'
      },
      {
        value: 'g3',
        text: 'Grupo 3'
      }
    ],
    position: '',
    userRol: 'Administrador',
    extension: '',
    createdOn: new Date('2023-02-14T18:58:02.626Z'),
    createdBy: 'Fulanito',
    session: {
      activeSessions: 2,
      status: 'active' // active inactive banned
    }
  },
  {
    id: '002',
    name: 'Javier Alejandro',
    surnames: 'Albor Chavez',
    username: 'javieralbor',
    email: 'javieralbor@gmail.com',
    groups: [
      {
        value: 'g1',
        text: 'Grupo 1'
      },
      {
        value: 'g3',
        text: 'Grupo 3'
      }
    ],
    position: '',
    userRol: 'Administrador',
    extension: '',
    createdOn: new Date('2023-02-14T18:58:02.626Z'),
    createdBy: 'Armando Albor',
    session: {
      activeSessions: 0,
      status: 'inactive' // active inactive banned
    }
  },
  {
    id: '003',
    name: 'Efraín',
    surnames: 'Cuadras Gonzalez',
    username: 'efracuadras',
    email: 'efrain.cuadras@octopy.com',
    groups: [
      {
        value: 'g1',
        text: 'Grupo 1'
      }
    ],
    position: '',
    userRol: 'Administrador',
    extension: '',
    createdOn: new Date('2023-02-14T18:58:02.626Z'),
    createdBy: 'Armando Albor',
    session: {
      activeSessions: 0,
      status: 'banned' // active inactive banned
    }
  },
  {
    id: '004',
    name: 'Alfredo Rafael',
    surnames: 'González Rodríguez',
    username: 'gosthramses',
    email: 'alfredo.gonzales@octopy.com',
    groups: [
      {
        value: 'g1',
        text: 'Grupo 1'
      },
      {
        value: 'g3',
        text: 'Grupo 3'
      }
    ],
    position: '',
    userRol: 'Administrador',
    extension: '',
    createdOn: new Date('2023-02-14T18:58:02.626Z'),
    createdBy: 'Armando Albor',
    session: {
      activeSessions: 4,
      status: 'active' // active inactive banned
    }
  }
]

interface Props {
  setTotalSelectedUsers: (totalUsers: Number) => void
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
  onResetPasswordUser,
  setTotalSelectedUsers
}: Props): ReactElement => {
  const getMessage = useFormatMessage(generalMessages)
  const [sortingState, setSortingState] = useState<SortingState>([])
  const [data, setData] = useState<User[]>(mockData)

  useEffect(() => {
    // TODO: remove this when backend is ready
    if (sortingState.length > 0) {
      if (sortingState[0].desc) {
        setData(sortBy(data, [sortingState[0].id]).reverse())
      } else {
        setData(sortBy(data, [sortingState[0].id]))
      }
    }
  }, [sortingState])

  const columns = useTableColumns<User>(() => [
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
      header: getMessage('user')
    },
    {
      accessorKey: 'groups',
      header: getMessage('groups'),
      cell: ({ getValue }) =>
        getValue<Group[]>()
          .map((group) => group.text)
          .join(', ')
    },
    {
      accessorKey: 'userRol',
      header: getMessage('profile')
    },
    {
      accessorKey: 'createdBy',
      header: getMessage('registeredBy')
    },
    {
      accessorKey: 'session',
      header: getMessage('session'),
      cell: ({ getValue }) => {
        const sessions = getValue<SessionInfo>().activeSessions
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
      accessorKey: 'session',
      header: getMessage('status'),
      cell: ({ getValue }) => {
        const status = getValue<SessionInfo>().status

        return (
          <Tag
            label={getMessage(status)}
            className={`px-4 py-1 bg-${colorByStatus[status]} w-32 justify-center`}
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
      cell: ({ getValue, cell }) => {
        const id = getValue<string>()
        const status = cell.row.original.session.status

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
                disabled: status === 'inactive' ?? status === 'banned',
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
    <Table
      columns={columns}
      data={data}
      className="overflow-x-auto shadow"
      manualSorting={{
        onSortingChange: setSortingState,
        sorting: sortingState
      }}
      onRowClicked={(row) => onSelectUser(row)}
      maxHeight={500}
      withCheckbox
      actionsForSelectedItems={[
        {
          name: 'Eliminar',
          action: (items) => {
            setTotalSelectedUsers(items.length)
            onDeleteUser(items.map((user) => user.id))
          },
          Icon: TrashIcon
        },
        {
          name: 'Deshabilitar',
          action: (items) => {
            setTotalSelectedUsers(items.length)
            onDisableUser(items.map((user) => user.id))
          },
          Icon: NoSymbolIcon
        },
        {
          name: 'Cerrar sesión',
          action: (items) => {
            setTotalSelectedUsers(items.length)
            onRemoteLogOffUser(items.map((user) => user.id))
          },
          Icon: ArrowLeftOnRectangleIcon
        }
      ]}
    />
  )
}

export default UserList
