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
import AuditDrawer from './components/AuditDrawer'
import SpecificMovementsHistory from './components/SpecificMovementsHistory'
import {
  auditDrawerMessages,
  auditableActions,
  auditableModules,
  messages
} from './messages'
import { useModuleAudits, useSpecificUserAudits } from 'context/Audit'
import { Audit as AuditInterface } from 'context/Audit/types'
import useUserDrawer from './hooks/useUserDrawer'
import { getActionChangeMessage, getActionTitle } from './utils'

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
            action={getActionTitle(
              formatMessage,
              row.specificModule ?? row.moduleName,
              row.action,
              row.name
            )}
            moduleName={formatMessage(auditableModules[row.moduleName])}
            date={row.createdAt}
            change={getActionChangeMessage(
              formatMessage,
              row.specificModule ?? row.moduleName,
              row.action,
              row.old,
              row.new
            )}
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

  const columns = useTableColumns<AuditInterface>(() => [
    {
      accessorKey: 'username',
      id: 'user',
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
          return getActionTitle(
            formatMessage,
            row.original.specificModule ?? row.original.moduleName,
            row.original.action,
            row.original.name
          )
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
    auditActions?.getData({ page: 1 })
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
            }
          ]}
          onChange={async (data) =>
            await auditActions?.getData({
              start_time: data.dateRange[0],
              end_time: data.dateRange[1],
              filters: data.filterByField.fields,
              query: data.filterByField.search,
              clearDates: data.clearDates,
              page: 1
            })
          }
          // download={(type) => console.log(type)}
        />
      </div>
      <div className="flex gap-4">
        <Link to={pathRoute.audit.failedLoginAttemps}>
          <Typography
            variant="subtitle"
            style="semibold"
            className="uppercase text-secondary text-base"
          >
            {formatMessage(messages.loginFailedAttemps)}
          </Typography>
        </Link>

        <Link to={pathRoute.audit.blockedUsers}>
          <Typography
            variant="subtitle"
            style="semibold"
            className="uppercase text-secondary text-base"
          >
            {formatMessage(messages.blockedUsers)}
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
          maxHeight={!selectedTarget ? '70vh' : 225}
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
