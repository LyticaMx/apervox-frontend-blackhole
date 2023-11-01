import Dialog from 'components/Dialog'
import Table from 'components/Table'
import { useLineHistory } from 'context/LineHistory'
import { LineEvent } from 'context/LineHistory/types'
import { format } from 'date-fns'
import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useEffect } from 'react'
import { lineHistoryMessages } from '../messages'
import IconButton from 'components/Button/IconButton'
import { XCircleIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'

const LineHistory = (): ReactElement => {
  const { data, pagination, actions, line } = useLineHistory()
  const getMessage = useFormatMessage(lineHistoryMessages)

  const columns = useTableColumns<LineEvent>(() => [
    {
      accessorKey: 'technique',
      header: getMessage('technique')
    },
    {
      accessorKey: 'techniqueStatus',
      header: getMessage('status'),
      meta: {
        columnFilters: {
          onChange: () => {},
          options: [
            { name: getMessage('active'), value: 'active' },
            { name: getMessage('concluding'), value: 'concluding' },
            { name: getMessage('concluded'), value: 'concluded' }
          ],
          multiple: true
        }
      },
      cell: ({ getValue }) => getMessage(getValue<string>())
    },
    {
      accessorKey: 'techniqueStartDate',
      header: getMessage('techniqueStartDate'),
      cell: ({ getValue }) => {
        const date = getValue<string>()
        if (date === '') return ''
        return format(new Date(date), 'dd/MM/yyyy - HH:mm')
      }
    },
    {
      accessorKey: 'techniqueEndDate',
      header: getMessage('techniqueEndDate'),
      cell: ({ getValue }) => {
        const date = getValue<string>()
        if (date === '') return ''
        return format(new Date(date), 'dd/MM/yyyy - HH:mm')
      }
    },
    {
      accessorKey: 'endDate',
      header: getMessage('targetEndDate'),
      cell: ({ getValue }) => {
        const date = getValue<string>()
        if (date === '') return ''
        return format(new Date(date), 'dd/MM/yyyy - HH:mm')
      }
    },
    {
      accessorKey: 'target',
      header: getMessage('target')
    }
  ])

  const handleClose = (): void => {
    actions?.setLine()
  }

  useEffect(() => {
    if (!line) return

    actions?.getData({ page: 1 })
  }, [line])

  return (
    <Dialog open={Boolean(line)} onClose={handleClose} size="6xl">
      <div className="flex justify-between mb-2">
        <Typography style="semibold" className="uppercase" variant="subtitle">
          {getMessage('title', { phone: line?.phone ?? '' })}
        </Typography>
        <IconButton
          onClick={handleClose}
          className="text-red-600 hover:!bg-red-100 transition-colors"
        >
          <XCircleIcon className="h-5 w-5" />
        </IconButton>
      </div>
      <div>
        <Table
          columns={columns}
          data={data}
          pageSize={pagination.limit}
          manualSorting={{
            onSortingChange: (sort) => actions?.getData({ sort }),
            sorting: pagination.sort
          }}
          manualLimit={{
            onChangeLimit: (page, limit) =>
              actions?.getData({ page: page + 1, limit }),
            options: pagination.limitOptions ?? [15]
          }}
          manualPagination={{
            currentPage: pagination.page,
            totalRecords: pagination.totalRecords,
            onChange: (page) => actions?.getData({ page: page + 1 })
          }}
          maxHeight={500}
        />
      </div>
    </Dialog>
  )
}

export default LineHistory
