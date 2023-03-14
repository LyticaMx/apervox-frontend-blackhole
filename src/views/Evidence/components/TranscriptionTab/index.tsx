import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Table from 'components/Table'
import Typography from 'components/Typography'
import { generalMessages, platformMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ChangeEvent, ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { secondsToString } from 'utils/timeToString'
import { transcriptionTabMessages } from 'views/Evidence/messages'
import DialogEditor from './DialogEditor'

export interface TranscriptionSegment {
  interval: number
  speaker: string
  dialog: string
}

const TranscriptionTab = (): ReactElement => {
  const { formatMessage } = useIntl()
  const [segments, setSegments] = useState<TranscriptionSegment[]>([
    {
      interval: 0,
      speaker: 'Hablante 1',
      dialog:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio enim, vestibulum sed auctor eget, pellentesque fermentum justo. Integer at leo rhoncus, pharetra est mollis, dapibus elit. Praesent venenatis sit amet lacus non iaculis. Etiam sed luctus lorem. Quisque non sem lorem. Morbi ultricies dictum.'
    },
    {
      interval: 90,
      speaker: 'Hablante 2',
      dialog:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio enim, vestibulum sed auctor eget, pellentesque fermentum justo. Integer at leo rhoncus, pharetra est mollis, dapibus elit.'
    },
    {
      interval: 120,
      speaker: 'Hablante 1',
      dialog:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio enim, vestibulum sed auctor eget, pellentesque fermentum justo. Integer at leo rhoncus, pharetra est mollis, dapibus elit. Praesent venenatis sit amet lacus non iaculis. Etiam sed luctus lorem. Quisque non sem lorem. Morbi ultricies dictum.'
    },
    {
      interval: 190,
      speaker: 'Hablante 2',
      dialog:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio enim, vestibulum sed auctor eget, pellentesque fermentum justo. Integer at leo rhoncus, pharetra est mollis, dapibus elit.'
    },
    {
      interval: 220,
      speaker: 'Hablante 1',
      dialog:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio enim, vestibulum sed auctor eget, pellentesque fermentum justo. Integer at leo rhoncus, pharetra est mollis, dapibus elit. Praesent venenatis sit amet lacus non iaculis. Etiam sed luctus lorem. Quisque non sem lorem. Morbi ultricies dictum.'
    }
  ])

  const handleSegmentChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target
    const [interval, speaker] = name.split('-')
    setSegments(
      segments.map((segment) => {
        if (segment.interval !== +interval || segment.speaker !== speaker) {
          return segment
        }
        return {
          ...segment,
          dialog: value
        }
      })
    )
  }

  const columns = useTableColumns<TranscriptionSegment>(() => [
    {
      accessorKey: 'interval',
      header: () => (
        <span className="uppercase text-primary">
          {formatMessage(platformMessages.interval)}
        </span>
      ),
      cell: ({ getValue }) => (
        <span className="font-medium">
          {secondsToString(getValue<number>())}
        </span>
      )
    },
    {
      accessorKey: 'speaker',
      header: () => (
        <span className="uppercase text-primary">
          {formatMessage(generalMessages.speaker)}
        </span>
      ),
      cell: ({ getValue }) => `${getValue<string>()}:`
    },
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
          <Button color="primary" variant="contained">
            {formatMessage(transcriptionTabMessages.saveTranscription)}
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <Table
          columns={columns}
          data={segments}
          rowConfig={{ paddingSize: 'sm' }}
        />
      </div>
    </div>
  )
}

export default TranscriptionTab
