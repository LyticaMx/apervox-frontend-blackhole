import Table from 'components/Table'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import GoBackButton from 'components/GoBackButton'
import { formMessages, generalMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { format } from 'date-fns'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { messages } from './messages'
import UserDrawer from './components/UserDrawer'
import { SortingState } from '@tanstack/react-table'
import { useDrawer } from 'context/Drawer'

interface BlockedUsersAudit {
  id: string
  user: string
  description: string
  name: string
  date: string
}

const BlockedUsers = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useDrawer()
  const [sortingState, setSortingState] = useState<SortingState>([])

  const columns = useTableColumns<BlockedUsersAudit>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      enableSorting: false
    },
    {
      accessorKey: 'user',
      header: formatMessage(generalMessages.user),
      cell: ({ getValue }) => (
        <button
          className="text-primary hover:underline"
          onClick={(e) => {
            e.stopPropagation()
            actions?.handleOpenDrawer({
              body: (
                <UserDrawer
                  user={{
                    name: 'Pruebas',
                    surnames: 'Uno',
                    email: 'test@test.com',
                    createdBy: 'SuperAdmin',
                    createdOn: new Date('2023-02-14T18:58:02.626Z'),
                    extension: '150',
                    groups: 'Auditoria, Grupo 4',
                    id: '002',
                    position: 'General',
                    username: 'PUno',
                    userRol: 'Administrador'
                  }}
                />
              )
            })
          }}
        >
          {getValue<string>()}
        </button>
      )
    },
    {
      accessorKey: 'description',
      header: formatMessage(generalMessages.description)
    },
    {
      accessorKey: 'name',
      header: formatMessage(formMessages.name)
    },
    {
      accessorKey: 'date',
      header: formatMessage(generalMessages.date),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'dd/MM/yyyy')
    },
    {
      accessorKey: 'date',
      header: formatMessage(generalMessages.hour),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'hh:mm')
    }
  ])

  return (
    <div>
      <GoBackButton route={pathRoute.audit.general} />
      <div className="flex items-center justify-between">
        <Typography
          variant="title"
          style="bold"
          className="uppercase text-secondary"
        >
          {formatMessage(messages.title)}
        </Typography>
        <ViewFilter
          fields={[
            {
              label: formatMessage(generalMessages.user),
              name: 'user'
            },
            {
              label: formatMessage(generalMessages.description),
              name: 'description'
            },
            {
              label: formatMessage(messages.auditedModule),
              name: 'module'
            }
          ]}
          onChange={(data) => console.log(data, null, 2)}
          download={(type) => console.log(type)}
        />
      </div>
      <div className="flex gap-4">
        <Link to={pathRoute.audit.failedLoginAttemps}>
          <Typography
            variant="subtitle"
            style="semibold"
            className="uppercase text-secondary text-base"
          >
            {formatMessage(messages.loginFailedAttemps, {
              attemps: (
                <span className="text-primary px-2 py-0.5 rounded bg-primary-100 bg-opacity-75">
                  {7}
                </span>
              )
            })}
          </Typography>
        </Link>

        <Link to={pathRoute.audit.blockedUsers}>
          <Typography
            variant="subtitle"
            style="semibold"
            className="uppercase text-secondary text-base"
          >
            {formatMessage(messages.blockedUsers, {
              users: (
                <span className="text-primary px-2 py-0.5 rounded bg-primary-100 bg-opacity-75">
                  {2}
                </span>
              )
            })}
          </Typography>
        </Link>
      </div>
      <div className="mt-2">
        <Table
          columns={columns}
          data={[
            {
              id: '001',
              date: '2023-02-14T18:58:02.626Z',
              description:
                'Usuario bloqueado por alcanzar el límite de intentos fallidos',
              name: 'Pruebas Uno',
              user: 'PUno'
            },
            {
              id: '002',
              date: '2023-02-14T14:58:02.626Z',
              description:
                'Usuario bloqueado por alcanzar el límite de intentos fallidos',
              name: 'Pruebas Tres',
              user: 'PTres'
            }
          ]}
          manualSorting={{
            onSortingChange: setSortingState,
            sorting: sortingState
          }}
        />
      </div>
    </div>
  )
}

export default BlockedUsers
