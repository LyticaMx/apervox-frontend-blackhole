import {
  ArchiveBoxIcon,
  DocumentTextIcon,
  EyeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import Table from 'components/Table'
import { format } from 'date-fns'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useEffect } from 'react'
import { tableMessages } from '../messages'
import { useCallHistory } from 'context/CallHistory'
import { Call } from 'context/CallHistory/types'
import IconButton from 'components/Button/IconButton'
import clsx from 'clsx'

const CallsTable = (): ReactElement => {
  const getMessage = useFormatMessage(tableMessages)
  const getGlobalMessage = useGlobalMessage()
  const { data, pagination, actions: historyActions } = useCallHistory()

  useEffect(() => {
    historyActions?.getData({}, true)
  }, [])

  const columns = useTableColumns<Call>(() => [
    {
      accessorKey: 'source',
      header: getGlobalMessage('source', 'platformMessages')
    },
    {
      accessorKey: 'line',
      header: getGlobalMessage('phoneLine', 'platformMessages')
    },
    {
      accessorKey: 'target',
      header: getMessage('target')
    },
    {
      accessorKey: 'date',
      header: getMessage('date'),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'dd/MM/yyyy')
    },
    {
      id: 'time',
      accessorKey: 'date',
      header: getMessage('time'),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'hh:mm')
    },
    {
      accessorKey: 'carrier',
      header: getMessage('operator')
    },
    {
      accessorKey: 'technique',
      header: getGlobalMessage('technique', 'platformMessages')
    },
    {
      accessorKey: 'relevance',
      header: getMessage('clasification'),
      cell: ({ getValue }) => getMessage(getValue<string>()),
      meta: {
        columnFilters: {
          options: [
            { name: getMessage('relevant'), value: 'relevant' },
            { name: getMessage('not_relevant'), value: 'not_relevant' },
            { name: getMessage('discarded'), value: 'discarded' },
            { name: getMessage('unclassified'), value: 'unclassified' }
          ],
          onChange: (relevance) => historyActions?.getData({ relevance }),
          multiple: true
        }
      }
    },
    {
      accessorKey: 'priority',
      header: getGlobalMessage('priority', 'generalMessages'),
      cell: ({ getValue }) => {
        const priority = getValue<string>()
        const colors = {
          low: '#5DA9FF',
          medium: '#E8D903',
          high: '#F59A11',
          urgent: '#FF5D5D'
        }

        return (
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colors[priority] }}
            />
            <p className="pr-1 py-0.5 text-sm">
              {getMessage(`${priority}Priority`)}
            </p>
          </div>
        )
      },
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
          onChange: (priority) => historyActions?.getData({ priority }),
          multiple: true
        }
      }
    },
    {
      accessorKey: 'type',
      header: getMessage('callType'),
      cell: ({ getValue }) => {
        const callType = getValue<string>()
        const colors = {
          verification: '#53dc80',
          evidence: '#4646fd',
          trash: '#f59a11'
        }

        return (
          <p className="px-1 py-0.5 rounded-3xl text-sm flex items-center gap-2">
            <PhoneIcon
              className="w-4 h-4"
              style={{ color: colors[callType] ?? '#a3a3a3s' }}
            />
            {getMessage(callType)}
          </p>
        )
      },
      meta: {
        columnFilters: {
          options: [
            { name: getMessage('evidence'), value: 'evidence' },
            { name: getMessage('verification'), value: 'verification' },
            { name: getMessage('trash'), value: 'trash' }
          ],
          onChange: (type) => historyActions?.getData({ type }),
          multiple: true
        }
      }
    },
    {
      accessorKey: 'workedBy',
      header: getMessage('workBy')
    },
    {
      id: 'label',
      header: getMessage('label'),
      cell: ({ row }) => {
        const { label, otherLabel } = row.original

        if (!label && !otherLabel) return null

        return (
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                'h-4 w-4 rounded-full',
                otherLabel ? 'bg-muted' : ''
              )}
              style={{
                backgroundColor: label ? label.color : ''
              }}
            />
            <p className="pr-1 py-0.5 text-sm">{label?.name ?? otherLabel}</p>
          </div>
        )
      }
    },
    {
      accessorKey: 'transcription',
      header: getMessage('transcription'),
      cell: ({ getValue }) =>
        getValue<boolean>() ? (
          <div>
            <DocumentTextIcon className="w-4 h-4 text-muted" />
          </div>
        ) : null,
      meta: {
        columnFilters: {
          options: [
            {
              name: getMessage('withTranscription'),
              value: 'withTranscription'
            },
            {
              name: getMessage('withoutTranscription'),
              value: 'withoutTranscription'
            },
            { name: getMessage('both'), value: 'both' }
          ],
          onChange: (hasTranscription) =>
            historyActions?.getData({ hasTranscription })
        }
      }
    },
    {
      id: 'actions',
      header: getGlobalMessage('actions', 'generalMessages'),
      cell: () => (
        <div className="flex">
          <IconButton>
            <ArchiveBoxIcon className="w-4 h-4 text-muted" />
          </IconButton>
          <IconButton>
            <EyeIcon className="w-4 h-4 text-muted" />
          </IconButton>
        </div>
      ),
      enableSorting: false
    }
  ])

  return (
    <Table
      columns={columns}
      data={data}
      className="overflow-x-auto shadow rounded-lg"
      withCheckbox
      manualSorting={{
        onSortingChange: (sort) => historyActions?.getData({ sort }),
        sorting: pagination.sort
      }}
      maxHeight={500}
      manualLimit={{
        options: [15, 25, 50, 100],
        onChangeLimit: (page, limit) =>
          historyActions?.getData({ page: page + 1, limit })
      }}
      pageSize={pagination.limit}
      manualPagination={{
        currentPage: pagination.page,
        totalRecords: pagination.totalRecords,
        onChange: (page) => historyActions?.getData({ page: page + 1 })
      }}
      // actionsForSelectedItems={} Cuando exista clasificación activar
    />
  )
}

export default CallsTable
