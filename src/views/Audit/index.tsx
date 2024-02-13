import Table from 'components/Table'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { useDrawer } from 'context/Drawer'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
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
import NavLinks from './components/NavLinks'

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
  const {
    data,
    actions: auditActions,
    pagination,
    staticFilter
  } = useModuleAudits()
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
      cell: ({ getValue, row }) => {
        if (row.original.moduleName === 'auth') {
          return <span className="text-primary">{row.original.name}</span>
        }

        return (
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
      }
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
              name: formatMessage(messages.rolesAndPermissions),
              value: 'roles'
            },
            {
              name: formatMessage(messages.workgroups),
              value: 'groups'
            },
            {
              name: formatMessage(messages.acquisitionMedium),
              value: 'adquisition'
            },
            {
              name: formatMessage(messages.usersControl),
              value: 'users'
            },
            {
              name: formatMessage(messages.techniques),
              value: 'techniques'
            },
            { name: formatMessage(messages.monitor), value: 'monitor' },
            { name: formatMessage(messages.settings), value: 'settings' },
            { name: formatMessage(messages.metadata), value: 'metadata' }
          ],
          onChange: async (values) => {
            await auditActions?.getData({ module: values })
          },
          optionsName: formatMessage(messages.auditedModule),
          multiple: true,
          selected: staticFilter.module
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
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'HH:mm')
    }
  ])

  useEffect(() => {
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
      <NavLinks />
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
