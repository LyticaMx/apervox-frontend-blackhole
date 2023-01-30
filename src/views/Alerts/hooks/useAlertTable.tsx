import { ColumnDef } from '@tanstack/react-table'
import Switch from 'components/Form/Switch'
import { useAlerts } from 'context/Alerts'
import { generalMessages } from 'globalMessages'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Alert } from 'types/alert'

interface Props {
  getAlerts: () => Promise<void>
}

interface returnType {
  columns: Array<ColumnDef<Alert>>
}

const useAlertTable = (props: Props): returnType => {
  const { getAlerts } = props
  const { formatMessage } = useIntl()
  const { actions } = useAlerts()

  const columns = useMemo<Array<ColumnDef<Alert>>>(
    () => [
      {
        header: formatMessage(generalMessages.category),
        accessorKey: 'category'
      },
      {
        header: formatMessage(generalMessages.condition),
        accessorKey: 'condition'
      },
      {
        header: formatMessage(generalMessages.incidences),
        accessorKey: 'incidences'
      },
      {
        header: ' ',
        accessorKey: 'active',
        cell: (props) => (
          <Switch
            value={props.getValue() as boolean}
            onChange={async (val) => {
              await actions?.updateAlert(props.row.original.id, val)
              getAlerts()
            }}
            size="sm"
            color="indigo"
            stopPropagation
          />
        )
      }
    ],
    []
  )

  return { columns }
}

export { useAlertTable }
