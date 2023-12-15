import { DocumentTextIcon, XCircleIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Table from 'components/Table'
import Typography from 'components/Typography'
import { platformMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ChangeEvent, ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { secondsToString } from 'utils/timeToString'
import { transcriptionTabMessages } from 'views/Evidence/messages'
import DialogEditor from './DialogEditor'
import { RegionInterface } from 'components/WaveSurferContext/types'
import Tooltip from 'components/Tooltip'
import TranscriptDialog from './TranscriptDialog'
import { useWorkingEvidence } from 'context/WorkingEvidence'
import DownloadDialog from './DownloadDialog'
import useToast from 'hooks/useToast'
import CancelTranscriptionDialog from './CancelTranscriptionDialog'
import EmptyRegionDialog from './EmptyRegionDialog'

interface Props {
  transcriptionSegments: RegionInterface[]
  resetRegions: () => void
  onChangeSegment: (id: string, value: string) => void
  onSave: () => Promise<void>
  lock: boolean
  progress: number
}

const TranscriptionTab = (props: Props): ReactElement => {
  const {
    onChangeSegment,
    onSave,
    transcriptionSegments,
    lock,
    resetRegions,
    progress
  } = props
  const [aRegionIsEmpty, setARegionIsEmpty] = useState(false)
  const [openTranscriptDialog, setOpenTranscriptDialog] = useState(false)
  const [openCancelTranscriptDialog, setOpenCancelTranscriptDialog] =
    useState(false)
  const [onMouseOver, setOnMouseOver] = useState(false)
  const { formatMessage } = useIntl()
  const { actions: workingEvidenceActions } = useWorkingEvidence()
  const toast = useToast()
  const handleSegmentChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target
    onChangeSegment(name, value)
  }

  const columns = useTableColumns<RegionInterface>(
    () => [
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
            disabled={lock}
          />
        )
      }
    ],
    [lock]
  )

  return (
    <div>
      <TranscriptDialog
        open={openTranscriptDialog}
        onAccept={async () => {
          resetRegions()
          await workingEvidenceActions?.createFullTranscription()
          toast.info(formatMessage(transcriptionTabMessages.waitingToStartTask))
          setOpenTranscriptDialog(false)
        }}
        onClose={() => setOpenTranscriptDialog(false)}
      />
      <CancelTranscriptionDialog
        onAccept={async () => {
          await workingEvidenceActions?.cancelFullTranscription()
          setOpenCancelTranscriptDialog(false)
        }}
        onClose={() => setOpenCancelTranscriptDialog(false)}
        open={openCancelTranscriptDialog}
      />
      <EmptyRegionDialog
        onAccept={onSave}
        onClose={() => setARegionIsEmpty(false)}
        open={aRegionIsEmpty}
      />
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
          <div className="flex gap-2 items-center">
            {lock && (
              <Typography
                variant="caption"
                className="text-secondary-gray"
              >{`Transcribiendo ${progress}%`}</Typography>
            )}
            <Tooltip
              content={
                lock
                  ? formatMessage(transcriptionTabMessages.cancelTranscription)
                  : formatMessage(transcriptionTabMessages.transcriptAllAudio)
              }
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <button
                className="text-secondary-gray hover:enabled:text-secondary border shadow-md p-2 rounded-md"
                onClick={() => {
                  if (lock) setOpenCancelTranscriptDialog(true)
                  else setOpenTranscriptDialog(true)
                }}
                onMouseEnter={() => {
                  if (lock) setOnMouseOver(true)
                }}
                onMouseLeave={() => {
                  if (lock) setOnMouseOver(false)
                }}
              >
                {lock ? (
                  onMouseOver ? (
                    <XCircleIcon className="w-5 h-5" />
                  ) : (
                    <span className="animate-spin w-5 h-5 border-[3px] border-secondary-gray border-b-transparent rounded-[50%] block box-border" />
                  )
                ) : (
                  <DocumentTextIcon className="w-5 h-5" />
                )}
              </button>
            </Tooltip>
          </div>
          <DownloadDialog
            onExport={(document) =>
              workingEvidenceActions?.exportTranscription(document)
            }
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              if (
                transcriptionSegments.some((segment) => {
                  return (
                    segment.data &&
                    (segment.data.text === '' || segment.data.dialog === '')
                  )
                })
              ) {
                setARegionIsEmpty(true)
                return
              }
              onSave()
            }}
            disabled={lock}
          >
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
