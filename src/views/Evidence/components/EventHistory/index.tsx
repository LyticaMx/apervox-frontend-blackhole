import Table from 'components/Table'
import Typography from 'components/Typography'
import { format } from 'date-fns'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { messages, eventHistoryMessages } from 'views/Evidence/messages'

interface HistoryRow {
  id: string
  date: string
  madeBy: string
  action: string
}

const EventHistory = (): ReactElement => {
  const { formatMessage } = useIntl()
  const columns = useTableColumns<HistoryRow>(() => [
    {
      header: formatMessage(eventHistoryMessages.movementDate),
      accessorKey: 'date',
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yy - HH:mm')
    },
    {
      header: formatMessage(eventHistoryMessages.madeBy),
      accessorKey: 'madeBy'
    },
    {
      header: formatMessage(eventHistoryMessages.performedAction),
      accessorKey: 'action'
    }
  ])

  const demoData = useMemo<HistoryRow[]>(
    () => [
      {
        id: '001',
        action: 'Reprodujo audio',
        madeBy: 'n.suarez',
        date: '2022-11-28T16:00:00.000Z'
      },
      {
        id: '002',
        action: 'Descargo audio',
        madeBy: 'a.martinez',
        date: '2022-11-28T15:00:00.000Z'
      },
      {
        id: '003',
        action: 'Ecualizó  audio',
        madeBy: 'a.martinez',
        date: '2022-11-28T14:30:00.000Z'
      },
      {
        id: '004',
        action: 'Modificó etiqueta',
        madeBy: 'g.cortez',
        date: '2022-11-28T14:00:00.000Z'
      },
      {
        id: '005',
        action: 'Creó etiqueta',
        madeBy: 'a.malvaez',
        date: '2022-11-27T22:00:00.000Z'
      },
      {
        id: '006',
        action: 'Reprodujo bucle',
        madeBy: 'g.cortez',
        date: '2022-11-27T21:30:00.000Z'
      },
      {
        id: '007',
        action: 'Creó bucle',
        madeBy: 'j.mendoza',
        date: '2022-11-27T21:00:00.000Z'
      },
      {
        id: '008',
        action: 'Eliminó etiqueta',
        madeBy: 'i.sanchez',
        date: '2022-11-27T19:00:00.000Z'
      },
      {
        id: '009',
        action: 'Descargo sinopsis',
        madeBy: 'a.martinez',
        date: '2022-11-27T18:30:00.000Z'
      }
    ],
    []
  )

  return (
    <div>
      <Typography
        variant="subtitle"
        className="uppercase text-secondary"
        style="bold"
      >
        {formatMessage(messages.eventHistory)}
      </Typography>
      <Typography className="mb-4">
        {formatMessage(eventHistoryMessages.evidenceModifications)}
      </Typography>

      <Table
        data={demoData}
        columns={columns}
        rowConfig={{ paddingSize: 'sm' }}
      />
    </div>
  )
}

export default EventHistory
