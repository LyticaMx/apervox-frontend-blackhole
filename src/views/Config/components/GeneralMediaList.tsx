import { CellContext } from '@tanstack/react-table'
import { ReactElement, useCallback } from 'react'
import { mediaMessages } from '../messages'
import { actionsMessages, platformMessages } from 'globalMessages'
import { useIntl } from 'react-intl'
import { Carrier, Device, Media } from '../Media'
import Typography from 'components/Typography'
import useTableColumns from 'hooks/useTableColumns'
import { format } from 'date-fns'
import Tooltip from 'components/Tooltip'
import IconButton from 'components/Button/IconButton'
import { TrashIcon } from '@heroicons/react/24/outline'
import Table from 'components/Table'

interface Props<T> {
  data: T[]
  handleDelete: () => void
  handleEdit: (row: T, event: any) => void
  handleMultipleDelete: (items: T[]) => Promise<boolean>
}

const GeneralMediaList = <DataType extends Media | Carrier | Device>(
  props: Props<DataType>
): ReactElement => {
  const { formatMessage } = useIntl()

  const renderMediaType = useCallback(
    ({ row }: CellContext<DataType, unknown>): ReactElement => {
      const data = row.original
      const config = { color: '', letter: '', caption: '' }

      switch (data.type) {
        case 'carrier':
          config.color = '#E020F5'
          config.letter = 'O'
          config.caption = formatMessage(mediaMessages.carrierCaption)
          break
        case 'device':
          config.color = '#E8D903'
          config.letter = 'E'
          config.caption = formatMessage(mediaMessages.deviceCaption, {
            device: data.deviceName
          })
          break
        case 'media':
          config.color = '#4646FD'
          config.letter = 'm'
          config.caption = formatMessage(platformMessages.inputMedium)
          break
        default:
          break
      }

      return (
        <div className="w-[500px] flex items-center gap-2" key={data.id}>
          <div
            className="rounded-full h-7 w-7 flex items-center justify-center"
            style={{ backgroundColor: config.color }}
          >
            <span className="text-white uppercase font-bold">
              {config.letter}
            </span>
          </div>
          <div>
            <Typography className="text-secondary !text-base !leading-3">
              {data.name}
            </Typography>
            <Typography className="text-secondary-gray !text-sm !leading-4">
              {config.caption}
            </Typography>
          </div>
        </div>
      )
    },
    []
  )

  const columns = useTableColumns<DataType>(() => [
    {
      header: '',
      id: 'media-data',
      cell: renderMediaType
    },
    {
      header: '',
      accessorKey: 'date',
      cell: ({ getValue }) => (
        <span className="text-secondary-gray">
          {format(new Date(getValue<string>()), 'dd/MM/yyyy - hh:mm')}
        </span>
      )
    },
    {
      header: '',
      accessorKey: 'id',
      id: 'info',
      cell: ({ row }) => (
        <Tooltip
          content={formatMessage(actionsMessages.delete)}
          floatProps={{ offset: 10, arrow: true }}
          classNames={{
            panel:
              'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
            arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
          }}
          placement="top"
        >
          <IconButton
            className="hover:text-primary"
            disabled={row.getIsSelected()}
            onClick={props.handleDelete}
          >
            <TrashIcon className="h-5 w-5" />
          </IconButton>
        </Tooltip>
      )
    }
  ])

  return (
    <Table
      columns={columns}
      data={props.data}
      withCheckbox
      onRowClicked={props.handleEdit}
      rowConfig={{ paddingSize: 'sm' }}
      actionsForSelectedItems={[
        {
          action: props.handleMultipleDelete,
          Icon: TrashIcon,
          name: 'deleteMedia'
        }
      ]}
    />
  )
}

export default GeneralMediaList
