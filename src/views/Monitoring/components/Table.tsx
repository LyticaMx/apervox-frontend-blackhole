import { PhoneIcon, PhoneXMarkIcon } from '@heroicons/react/24/outline'
import Table from 'components/Table'
import { format } from 'date-fns'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useEffect } from 'react'
import { tableMessages } from '../messages'
import { useMonitoring } from 'context/Monitoring'
import { LiveCall } from 'context/Monitoring/types'
import clsx from 'clsx'
import Tooltip from 'components/Tooltip'
import IconButton from 'components/Button/IconButton'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

const CallsTable = (): ReactElement => {
  const getMessage = useFormatMessage(tableMessages)
  const getGlobalMessage = useGlobalMessage()
  const { actions, pagination, data } = useMonitoring()
  const ability = useAbility()

  useEffect(() => {
    actions?.getData({}, true)
  }, [])

  const columns = useTableColumns<LiveCall>(
    () => [
      {
        accessorKey: 'target',
        header: getMessage('target')
      },
      {
        accessorKey: 'date',
        header: getMessage('date'),
        cell: ({ getValue }) =>
          format(new Date(getValue<string>()), 'dd/MM/yyyy')
      },
      {
        accessorKey: 'date',
        id: 'time',
        header: getMessage('time'),
        cell: ({ row }) => format(new Date(row.original.date), 'hh:mm')
      },
      {
        accessorKey: 'carrier',
        header: getMessage('operator')
      },
      {
        accessorKey: 'technique',
        header: getMessage('technique')
      },
      {
        accessorKey: 'priority',
        header: getMessage('priority'),
        cell: ({ getValue }) => (
          <p className="px-1 py-0.5 rounded-3xl text-sm">
            <span className="w-3 h-3 rounded-full bg-primary inline-block mr-2" />
            {getMessage(`${getValue<string>()}Priority`)}
          </p>
        ),
        meta: {
          columnFilters: {
            options: [
              {
                name: getMessage('lowPriority'),
                value: 'low'
              },
              {
                name: getMessage('mediumPriority'),
                value: 'medium'
              },
              {
                name: getMessage('highPriority'),
                value: 'high'
              },
              {
                name: getMessage('urgentPriority'),
                value: 'urgent'
              }
            ],
            onChange: (priority) => {
              actions?.getData({ priority })
            },
            multiple: true
          }
        }
      },
      {
        accessorKey: 'type',
        header: getMessage('callType'),
        cell: ({ getValue }) => (
          <p className="px-1 py-0.5 rounded-3xl text-sm flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-muted" />
            {getMessage(getValue<string>())}
          </p>
        ),
        meta: {
          columnFilters: {
            options: [
              {
                name: getMessage('evidence'),
                value: 'evidence_live'
              },
              {
                name: getMessage('verification'),
                value: 'verification_live'
              },
              {
                name: getMessage('trash'),
                value: 'trash_live'
              }
            ],
            onChange: (callType) => {
              actions?.getData({ callType })
            },
            multiple: true
          }
        }
      },
      {
        accessorKey: 'status',
        header: getGlobalMessage('status', 'generalMessages'),
        enableSorting: false,
        cell: ({ getValue }) => {
          const status = getValue<string>()

          return (
            <p
              className={clsx(
                'px-1 py-0.5 rounded-3xl text-white text-center text-sm',
                status === 'live' ? 'bg-red-500' : 'text-muted'
              )}
            >
              {getMessage(status)}
            </p>
          )
        }
      },
      {
        id: 'actions',
        header: getGlobalMessage('actions', 'generalMessages'),
        enableSorting: false,
        cell: () => (
          <div>
            <Tooltip
              content={getMessage('hangUp')}
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <IconButton
                className="ml-1"
                disabled={ability.cannot(ACTION.UPDATE, SUBJECT.CALL_EVIDENCES)}
              >
                <PhoneXMarkIcon className="w-4 h-4 text-muted" />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],
    [ability.rules]
  )

  return (
    <Table
      columns={columns}
      data={data}
      className="overflow-x-auto shadow rounded-lg"
      manualSorting={{
        onSortingChange: (sort) => actions?.getData({ sort }),
        sorting: pagination.sort
      }}
      maxHeight={500}
      manualLimit={{
        options: [15, 25, 50, 100],
        onChangeLimit: (page, limit) =>
          actions?.getData({ page: page + 1, limit })
      }}
      pageSize={pagination.limit}
      manualPagination={{
        currentPage: pagination.page,
        totalRecords: pagination.totalRecords,
        onChange: (page) => actions?.getData({ page: page + 1 })
      }}
    />
  )
}

export default CallsTable
