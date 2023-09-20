import Table from 'components/Table'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { useDrawer } from 'context/Drawer'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { pathRoute } from 'router/routes'
// import { SimpleDrawerConfig } from 'types/drawer'
import AuditDrawer from './components/AuditDrawer'
// import GroupDrawer from './components/GroupDrawer'
// import LineDrawer from './components/LineDrawer'
import SpecificMovementsHistory from './components/SpecificMovementsHistory'
// import TiDrawer from './components/TiDrawer'
import {
  auditDrawerMessages,
  auditableActions,
  auditableModules,
  // groupDrawerMessages,
  // lineDrawerMessages,
  messages
  // tiDrawerMessages
} from './messages'
import { useModuleAudits, useSpecificUserAudits } from 'context/Audit'
import { Audit as AuditInterface } from 'context/Audit/ModuleAudits/types'
import useUserDrawer from './hooks/useUserDrawer'

type TargetTypes = 'user' | 'group' | 'rol' | 'line' | 'ti' | null

export interface Target {
  type: TargetTypes
  id: string
  name: string
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
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null)
  const { openDrawer, selectedUser, clearUser } = useUserDrawer()
  const { data, actions: auditActions, pagination } = useModuleAudits()
  const { actions: specificUserActions } = useSpecificUserAudits()

  const handleOpenAction = useCallback(
    (row: Record<string, any>) => {
      actions?.handleOpenDrawer({
        type: 'aside',
        title: (
          <span className="text-secondary text-lg uppercase font-extrabold">
            {formatMessage(auditDrawerMessages.auditedMovement)}
          </span>
        ),
        body: (
          <AuditDrawer
            action="Cambio de nombre"
            moduleName="Roles y permisos"
            date={row.createdAt}
            change="Editó el rol de usuario (Auditoria) cambiando su nombre por (Auditor)"
            user={row.username}
          />
        ),
        config: {
          withoutBackdrop: true
        }
      })
    },
    [actions?.handleOpenDrawer]
  )

  /*
  const handleMoreData = useCallback((type: TargetTypes) => {
    const drawerConfig: SimpleDrawerConfig = {
      type: 'aside',
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
  */

  const columns = useTableColumns<AuditInterface>(() => [
    {
      accessorKey: 'username',
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
      cell: ({ getValue, row }) => (
        <button
          className="text-primary hover:underline"
          onClick={async (e) => {
            e.stopPropagation()
            openDrawer(row.original.userId)
          }}
        >
          {getValue<string>()}
        </button>
      )
    },
    {
      accessorKey: 'action',
      header: formatMessage(generalMessages.description),
      cell: ({ row, getValue }) => {
        const action = getValue<string>()

        if (auditableActions[action]) {
          return formatMessage(auditableActions[action])
        }

        return action
      }
    },
    {
      accessorKey: 'specificModule',
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
      },
      cell: ({ getValue }) => {
        const name = getValue<string>()

        if (auditableModules[name]) return formatMessage(auditableModules[name])

        return name
      }
    },
    {
      accessorKey: 'createdAt',
      id: 'date',
      header: formatMessage(generalMessages.date),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'dd/MM/yyyy')
    },
    {
      accessorKey: 'createdAt',
      id: 'hour',
      header: formatMessage(generalMessages.hour),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'hh:mm')
    }
  ])

  useEffect(() => {
    if (selectedTarget?.type === 'user' && selectedTarget.id === selectedUser) {
      setSelectedTarget(null)
      specificUserActions?.setUserId()

      return
    }

    if (selectedUser) {
      specificUserActions?.setUserId(selectedUser)
      setSelectedTarget({
        id: selectedUser,
        name: '',
        type: 'user'
      })
    } else {
      specificUserActions?.setUserId()
      setSelectedTarget(null)
    }
  }, [selectedUser])

  useEffect(() => {
    auditActions?.getData()
  }, [])

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
          data={data}
          manualSorting={{
            onSortingChange: (sort) => auditActions?.getData({ sort }),
            sorting: pagination.sort
          }}
          manualLimit={{
            options: [15, 25, 50, 100],
            onChangeLimit: (page, limit) =>
              auditActions?.getData({ page: page + 1, limit })
          }}
          onRowClicked={handleOpenAction}
          maxHeight={!selectedTarget ? 500 : 225}
          withCheckbox
          pageSize={pagination.limit}
          manualPagination={{
            currentPage: pagination.page,
            totalRecords: pagination.totalRecords,
            onChange: (page) => auditActions?.getData({ page: page + 1 })
          }}
        />
      </div>
      <SpecificMovementsHistory
        specificFilter={selectedTarget}
        handleClose={() => {
          switch (selectedTarget?.type) {
            case 'user':
              clearUser()
              break
            default:
              break
          }
          setSelectedTarget(null)
        }}
        handleSelectMovement={handleOpenAction}
        handleSelectUser={(user) => {
          openDrawer(user.id)
        }}
      />
    </div>
  )
}

export default Audit
