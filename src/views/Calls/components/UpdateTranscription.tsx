import { ReactElement, useMemo, useState, useEffect } from 'react'
import { useIntl } from 'react-intl'

import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'

import Button from 'components/Button'
import Drawer from 'components/Drawer'
import Table from 'components/Table'
import { actionsMessages, generalMessages } from 'globalMessages'
import { SegmentVM, CallType } from 'types/call'
import { useCallDetail } from 'context/CallDetail'

import { detailMessages } from '../messages'
import SegmentForm from './SegmentForm'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
  segments: SegmentVM[]
  type: CallType
}

const UpdateTranscription = ({
  open,
  onClose,
  onSuccess,
  segments,
  type
}: Props): ReactElement => {
  const intl = useIntl()
  const { actions } = useCallDetail()

  const [segmentList, setSegmentList] = useState<SegmentVM[]>(segments)
  const [openSegmentForm, setOpenSegmentForm] = useState(false)
  const [currentSegment, setCurrentSegment] = useState<SegmentVM | null>(null)

  useEffect(() => {
    setSegmentList(segments)
  }, [segments])

  const onSuccesForm = (newTranscription: string): void => {
    const newSegmentList = segmentList.map((segment: SegmentVM) => {
      if (segment.id === currentSegment?.id) {
        const updateSegment = {
          ...segment,
          transcription: newTranscription,
          updated: true
        }
        return updateSegment
      }
      return segment
    })

    setSegmentList(newSegmentList)
    setOpenSegmentForm(false)
    setCurrentSegment(null)
  }

  const applyChanges = async (): Promise<void> => {
    const transcriptionApiStructure = segmentList
      .filter((segment) => segment.updated)
      .map((segment) => ({
        transcription_id: segment.transcription_id,
        transcription: segment.transcription,
        transcription_type:
          type === CallType.RECEIVED ? 'received' : 'transmitted'
      }))

    const successUpdate = await actions?.updateTranscriptions(
      transcriptionApiStructure as any
    )

    if (successUpdate) {
      if (onSuccess) onSuccess()
    }
  }

  const transcriptionColumns = useMemo(
    () => [
      {
        header: intl.formatMessage(generalMessages.transcription),
        accessorKey: 'transcription',
        cell: (data) => {
          const row: SegmentVM = data.row.original

          if (!row.transcription) {
            return ' - '
          }

          return row.transcription
        }
      },
      {
        header: intl.formatMessage(generalMessages.start),
        accessorKey: 'start_time'
      },
      {
        header: intl.formatMessage(generalMessages.end),
        accessorKey: 'end_time'
      },
      {
        header: ' ',
        cell: (data) => {
          const row: SegmentVM = data.row.original

          return (
            <Button
              color="blue"
              onClick={() => {
                setOpenSegmentForm(true)
                setCurrentSegment(row)
              }}
            >
              {intl.formatMessage(actionsMessages.edit)}
            </Button>
          )
        }
      }
    ],
    [segmentList]
  )

  return (
    <div>
      <Drawer
        open={open}
        placement="bottom"
        onClose={onClose}
        title={
          <div className="w-full flex items-center mx-5 mt-5">
            <ChatBubbleLeftEllipsisIcon className="w-5 h-5 mx-2" />
            <p className="font-bold text-slate-800">
              {intl.formatMessage(detailMessages.transcriptionBySegment)}
            </p>
          </div>
        }
      >
        <div className="mx-5">
          <div className="flex justify-between">
            <p className="text-sm text-slate-600">
              {intl.formatMessage(
                detailMessages.transcriptionBySegmentDescription
              )}
            </p>
            <Button variant="contained" onClick={applyChanges}>
              {intl.formatMessage(actionsMessages.aplyChanges)}
            </Button>
          </div>
          <Table
            data={segmentList}
            columns={transcriptionColumns}
            pageSize={5}
            className="mt-5"
          />
        </div>
      </Drawer>
      <SegmentForm
        open={openSegmentForm}
        onClose={() => setOpenSegmentForm(false)}
        onSuccess={onSuccesForm}
        initialTranscription={currentSegment?.transcription as string}
      />
    </div>
  )
}

export default UpdateTranscription
