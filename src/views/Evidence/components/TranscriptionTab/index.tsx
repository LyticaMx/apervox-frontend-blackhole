import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Table from 'components/Table'
import Typography from 'components/Typography'
import { platformMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ChangeEvent, ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { secondsToString } from 'utils/timeToString'
import { transcriptionTabMessages } from 'views/Evidence/messages'
import DialogEditor from './DialogEditor'
import { RegionInterface } from 'components/WaveSurferContext/types'

interface Props {
  transcriptionSegments: RegionInterface[]
  onChangeSegment: (id: string, value: string) => void
  onSave: () => Promise<void>
}

const TranscriptionTab = (props: Props): ReactElement => {
  const { onChangeSegment, onSave, transcriptionSegments } = props
  const { formatMessage } = useIntl()
  const handleSegmentChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target
    onChangeSegment(name, value)
  }

  const columns = useTableColumns<RegionInterface>(() => [
    {
      id: 'interval',
      header: () => (
        <span className="uppercase text-primary">
          {formatMessage(platformMessages.interval)}
        </span>
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          {`${secondsToString(row.original.start)} - ${secondsToString(
            row.original.end
          )}`}
        </span>
      )
    },
    /*
    {
      accessorKey: 'speaker',
      header: () => (
        <span className="uppercase text-primary">
          {formatMessage(generalMessages.speaker)}
        </span>
      ),
      cell: ({ getValue }) => `${getValue<string>()}:`
    },
    */
    {
      accessorKey: 'dialog',
      header: () => (
        <span className="uppercase text-primary">
          {formatMessage(platformMessages.dialog)}
        </span>
      ),
      cell: (cellContext) => (
        <DialogEditor
          cellContext={cellContext}
          onChange={handleSegmentChange}
        />
      )
    }
  ])

  return (
    <div>
      <Typography
        variant="subtitle"
        className="uppercase text-secondary"
        style="bold"
      >
        {formatMessage(transcriptionTabMessages.eventTranscription)}
      </Typography>
      <div className="flex justify-between items-center mb-4">
        <Typography>
          {formatMessage(transcriptionTabMessages.eventTranscriptionSubtitle)}
        </Typography>
        <div className="flex gap-2 items-center">
          <button className="text-secondary-gray hover:enabled:text-secondary border shadow-md p-2 rounded-md">
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>
          <Button color="primary" variant="contained" onClick={onSave}>
            {formatMessage(transcriptionTabMessages.saveTranscription)}
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <Table
          columns={columns}
          data={transcriptionSegments}
          rowConfig={{ paddingSize: 'sm' }}
        />
      </div>
    </div>
  )
}

export default TranscriptionTab
