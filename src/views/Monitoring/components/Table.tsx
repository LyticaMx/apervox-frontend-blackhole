import { PhoneIcon, PhoneXMarkIcon } from '@heroicons/react/24/outline'
import Table from 'components/Table'
import { format, addHours, isAfter } from 'date-fns'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useEffect, useMemo } from 'react'
import { tableMessages } from '../messages'
import { useMonitoring } from 'context/Monitoring'
import { LiveCall } from 'context/Monitoring/types'
import clsx from 'clsx'
import Tooltip from 'components/Tooltip'
import IconButton from 'components/Button/IconButton'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import { useLiveCallSocket } from 'context/LiveCallSocket'

const CallsTable = (): ReactElement => {
  const getMessage = useFormatMessage(tableMessages)
  const getGlobalMessage = useGlobalMessage()
  const { actions, data } = useMonitoring()
  const ability = useAbility()
  const { socket } = useLiveCallSocket()

  useEffect(() => {
    actions?.getAllData(true)
  }, [])

  useEffect(() => {
    if (!socket || !actions) return

    socket.on('new_call', actions.addLiveCall)
    socket.on('call_ended', actions.updateLiveCall)

    return () => {
      socket.off('new_call', actions.addLiveCall)
      socket.off('call_ended', actions.updateLiveCall)
    }
  }, [socket, actions])

  useEffect(() => {
    if (!actions) return

    const intervalId = setInterval(() => {
      data.forEach((call) => {
        if (
          isAfter(
            new Date(call.endedAt ?? 0),
            addHours(new Date(call.endedAt ?? 0), 1)
          )
        ) {
          actions.removeLiveCall(call.id)
        }
      })
    }, 2000) // TODO: Revisar mejor tiempo de eliminación

    return () => {
      clearInterval(intervalId)
    }
  }, [data, actions])

  const phoneColor = useMemo(
    () => ({
      evidence: 'text-primary-500',
      trash: 'text-orange-500',
      verification: 'text-green-400'
    }),
    []
  )

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
            <PhoneIcon
              className={clsx('w-4 h-4', phoneColor[getValue<string>()])}
            />
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
      maxHeight={500}
    />
  )
}

export default CallsTable
