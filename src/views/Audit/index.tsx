import { SortingState } from '@tanstack/react-table'
import Table from 'components/Table'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { useDrawer } from 'context/Drawer'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { SimpleDrawerConfig } from 'types/drawer'
import AuditDrawer from './components/AuditDrawer'
import GroupDrawer from './components/GroupDrawer'
import LineDrawer from './components/LineDrawer'
import SpecificMovementsHistory from './components/SpecificMovementsHistory'
import TiDrawer from './components/TiDrawer'
import UserDrawer from './components/UserDrawer'
import {
  auditDrawerMessages,
  groupDrawerMessages,
  lineDrawerMessages,
  messages,
  tiDrawerMessages
} from './messages'

type TargetTypes = 'user' | 'group' | 'rol' | 'line' | 'ti' | null

export interface Target {
  type: TargetTypes
  id: string
  name: string
}
export interface AuditInterface {
  id: string
  user: string
  description: string
  module: string
  date: string
  target: Target
}

export interface User {
  id: string
  name: string
  surnames: string
  username: string
  email: string
  groups: string
  position: string
  userRol: string
  extension: string
  createdOn: Date
  createdBy: string
}

const Audit = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useDrawer()
  const [sortingState, setSortingState] = useState<SortingState>([])
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null)

  const handleOpenAction = useCallback(
    (row: AuditInterface) => {
      actions?.handleOpenDrawer({
        title: (
          <span className="text-secondary text-lg uppercase font-extrabold">
            {formatMessage(auditDrawerMessages.auditedMovement)}
          </span>
        ),
        body: (
          <AuditDrawer
            action="Cambio de nombre"
            moduleName="Roles y permisos"
            date={row.date}
            change="Editó el rol de usuario (Auditoria) cambiando su nombre por (Auditor)"
            user={row.user}
          />
        ),
        config: {
          withoutBackdrop: true
        }
      })
    },
    [actions?.handleOpenDrawer]
  )

  const handleMoreData = useCallback((type: TargetTypes) => {
    const drawerConfig: SimpleDrawerConfig = {
      body: null,
      config: {
        withoutBackdrop: true
      }
    }

    switch (type) {
      case 'group':
        drawerConfig.title = (
          <span className="text-secondary text-lg uppercase font-extrabold">
            {formatMessage(groupDrawerMessages.groupData)}
          </span>
        )
        drawerConfig.body = (
          <GroupDrawer groupId="002" handleFilter={setSelectedTarget} />
        )
        break
      case 'line':
        drawerConfig.title = (
          <span className="text-secondary text-lg uppercase font-extrabold">
            {formatMessage(lineDrawerMessages.lineData)}
          </span>
        )
        drawerConfig.body = (
          <LineDrawer lineId="003" handleFilter={setSelectedTarget} />
        )
        break
      case 'ti':
        drawerConfig.title = (
          <span className="text-secondary text-lg uppercase font-extrabold">
            {formatMessage(tiDrawerMessages.tiData)}
          </span>
        )
        drawerConfig.body = (
          <TiDrawer tiId="004" handleFilter={setSelectedTarget} />
        )
        break
      case 'user':
        drawerConfig.body = (
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
            selectUser={setSelectedTarget}
          />
        )

        break
      default:
        break
    }
    if (drawerConfig.body) {
      actions?.handleOpenDrawer(drawerConfig)
    }
  }, [])

  const columns = useTableColumns<AuditInterface>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      id: 'id'
    },
    {
      accessorKey: 'user',
      id: 'user',
      /* TODO: Se comenta de manera temporal
      meta: {
        columnFilters: {
          optionsName: formatMessage(generalMessages.user),
          onChange: () => {}
        }
      }
      */
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
                  selectUser={setSelectedTarget}
                />
              ),
              config: {
                withoutBackdrop: true
              }
            })
          }}
        >
          {getValue<string>()}
        </button>
      )
    },
    {
      accessorKey: 'description',
      id: 'description',
      header: formatMessage(generalMessages.description),
      cell: ({ row, getValue }) => (
        <div>
          <span>{getValue<string>()}</span>
          {row.original.target && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleMoreData(row.original.target.type)
              }}
              className="ml-2 text-primary hover:underline"
            >
              {row.original.target.name}
            </button>
          )}
        </div>
      )
    },
    {
      accessorKey: 'module',
      id: 'module',
      header: formatMessage(messages.auditedModule),
      meta: {
        columnFilters: {
          options: [
            {
              name: formatMessage(generalMessages.statistics),
              value: 'statistics'
            },
            {
              name: formatMessage(messages.rolesAndPermissions),
              value: 'roles'
            },
            {
              name: formatMessage(messages.usersControl),
              value: 'users'
            },
            {
              name: formatMessage(messages.workgroups),
              value: 'groups'
            },
            {
              name: formatMessage(messages.acquisitionMedium),
              value: 'media'
            }
          ],
          onChange: () => {},
          optionsName: formatMessage(messages.auditedModule)
        }
      }
    },
    {
      accessorKey: 'date',
      id: 'date',
      header: formatMessage(generalMessages.date),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'dd/MM/yyyy')
    },
    {
      accessorKey: 'date',
      id: 'hour',
      header: formatMessage(generalMessages.hour),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'hh:mm')
    }
  ])

  return (
    <div>
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
              description: 'Cambio de nombre de rol',
              module: 'Usuarios',
              user: 'PUno',
              target: {
                id: '001',
                name: 'Auditoria',
                type: 'rol'
              }
            },
            {
              id: '002',
              date: '2023-02-14T18:58:02.626Z',
              description: 'Cambio de nombre de grupo',
              module: 'Grupos de trabajo',
              user: 'PUno',
              target: {
                id: '002',
                name: 'Crimen organizado',
                type: 'group'
              }
            },
            {
              id: '003',
              date: '2023-02-14T18:58:02.626Z',
              description: 'Registro de línea',
              module: 'Medios de Adquisición',
              user: 'PUno',
              target: {
                id: '003',
                name: '5509876278',
                type: 'line'
              }
            },
            {
              id: '004',
              date: '2023-02-14T18:58:02.626Z',
              description: 'Visualización de líneas asociadas a',
              module: 'Técnicas',
              user: 'PUno',
              target: {
                id: '004',
                name: 'T.I.90/2023-2',
                type: 'ti'
              }
            }
          ]}
          manualSorting={{
            onSortingChange: setSortingState,
            sorting: sortingState
          }}
          onRowClicked={handleOpenAction}
          maxHeight={!selectedTarget ? 500 : 225}
          withCheckbox
        />
      </div>
      <SpecificMovementsHistory
        specificFilter={selectedTarget}
        handleClose={() => setSelectedTarget(null)}
        totalMovements={3}
        handleSelectMovement={handleOpenAction}
        handleSelectUser={(user) =>
          actions?.handleOpenDrawer({
            body: <UserDrawer user={user} selectUser={setSelectedTarget} />,
            config: {
              withoutBackdrop: true
            }
          })
        }
      />
    </div>
  )
}

export default Audit
