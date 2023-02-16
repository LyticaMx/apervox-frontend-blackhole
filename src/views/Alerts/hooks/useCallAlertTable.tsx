import { ColumnDef } from '@tanstack/react-table'
import { generalMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
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
  const columns = useTableColumns<CallAlert>(() => [
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
      accessorKey: 'receiver',
      meta: {
        staticFilters: {
          optionsName: 'Valores X',
          options: [
            { name: 'Prueba 1', value: 'test 1' },
            { name: 'Prueba 2', value: 'test 2' },
            { name: 'Prueba 3', value: 'test 3' }
          ],
          onChange: (selected) => {
            alert(JSON.stringify(selected, null, 2))
          }
        }
      }
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
  ])

  return { columns }
}

export { useCallAlertTable }
