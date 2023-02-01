import { ColumnDef } from '@tanstack/react-table'
import { generalMessages } from 'globalMessages'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { CallAlert } from 'types/alert'

interface returnType {
  columns: Array<ColumnDef<CallAlert>>
}

const useCallAlertTable = (): returnType => {
  const { formatMessage } = useIntl()
  const history = useHistory()

  const columns = useMemo<Array<ColumnDef<CallAlert>>>(
    () => [
      {
        header: formatMessage(generalMessages.date),
        accessorKey: 'date'
      },
      {
        header: formatMessage(generalMessages.hour),
        accessorKey: 'hour'
      },
      { header: 'PIN', accessorKey: 'pin' },
      {
        header: formatMessage(generalMessages.receiver),
        accessorKey: 'receiver'
      },
      {
        header: formatMessage(generalMessages.duration),
        accessorKey: 'duration',
        cell: ({ getValue }) => <span>{`${String(getValue())} s`}</span>
      },
      {
        header: ' ',
        accessorKey: 'id',
        cell: ({ getValue }) => (
          <button
            className="text-blue-500 font-bold"
            onClick={() =>
              history.push(pathRoute.calls.detail, { id: getValue() })
            }
          >
            {formatMessage(generalMessages.details)}
          </button>
        )
      }
    ],
    []
  )

  return { columns }
}

export { useCallAlertTable }
