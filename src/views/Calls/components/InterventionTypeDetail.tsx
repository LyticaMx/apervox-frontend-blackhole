import { ReactElement, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'

import {
  BookmarkIcon,
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  FingerPrintIcon,
  PencilIcon,
  PlusCircleIcon,
  TagIcon
} from '@heroicons/react/24/outline'

import Card from 'components/Card'
import GaugeChart from 'components/Charts/Gauge'
import WordCloudChart from 'components/Charts/WordCloud'
import Table from 'components/Table'
import Tag from 'components/Tag'
import WaveSurferPlayer from 'components/Wavesurfer'
import IconButton from 'components/Button/IconButton'
import Button from 'components/Button'
import Typography from 'components/Typography'

import { useCallDetail } from 'context/CallDetail'
import { actionsMessages } from 'globalMessages'
import {
  CallType,
  SegmentVM,
  TagModel,
  WordFrequencySingleModel
} from 'types/call'

import UpdateTranscription from './UpdateTranscription'
import TranscriptionBox from './TranscriptionBox'
import TagForm from './TagForm'
import { detailMessages } from '../messages'
import ReceivedOptions from './ReceivedOptions'
import { useDatesFilter } from 'context/DatesFilter'

interface DetailByType {
  transcription: SegmentVM[]
  tags: TagModel[]
  voiceControlSimilarity: number
  wordFrequency: WordFrequencySingleModel[]
}

interface Props {
  detailByType: DetailByType
  type?: CallType
}

const InterventionTypeDetail = ({
  detailByType,
  type
}: Props): ReactElement => {
  const intl = useIntl()
  const { actions } = useCallDetail()
  const { dates } = useDatesFilter()

  const {
    state: { id }
  } = useLocation<any>()

  const [showEditSegments, setShowEditSegments] = useState(false)
  const [linkTagOpen, setLinkTagOpen] = useState(false)

  const overusedPhrasesColumns = useMemo(
    () => [
      {
        header: 'Palabra',
        accessorKey: 'word'
      },
      {
        header: 'Apariciones',
        accessorKey: 'frequency'
      }
    ],
    []
  )

  const generateTranscription = async (): Promise<void> => {
    const typeByTsc =
      type === CallType.TRANSMITTED ? 'TRANSMITTED_AUDIO' : 'RECEIVED_AUDIO'
    const successTsc = await actions?.createAutomaticTranscription(
      typeByTsc,
      id
    )

    if (successTsc) {
      await actions?.getSegmentList({ ...dates, id })
    }
  }

  const handleUnlinkTag = async (tagId: string): Promise<void> => {
    const res = await actions?.linkTag(id, tagId, type as CallType, true)

    if (res) {
      actions?.getLinkedTags({ ...dates, id })
    }
  }

  return (
    <div>
      <div className="mt-5">
        <Card>
          <WaveSurferPlayer
            wave
            zoom
            volume
            equalizer
            audio={{
              id: 'audio-1',
              name: 'Audio 1',
              duration: 44,
              url: 'https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
            }}
            defaultRegionColor={process.env.REACT_APP_WAVESURFER_REGION_COLOR}
            regions={detailByType.transcription as any}
            interactive
          />
        </Card>
      </div>
      {type && (
        <div>
          <div className="mt-5">
            <Card>
              <div className="w-full grid grid-cols-12">
                <div className="col-span-12 flex">
                  <TagIcon className="w-5 h-5 mr-2" />
                  <p className="text-sm font-bold text-slate-600">
                    {intl.formatMessage(detailMessages.linkedTags)}
                  </p>
                </div>
                <div className="col-span-11 overflow-auto">
                  <div className="flex pb-1">
                    {detailByType.tags.map((tag) => (
                      <Tag
                        key={tag.id}
                        label={tag.label}
                        className="mr-2"
                        removeAction={async (): Promise<void> =>
                          await handleUnlinkTag(tag.id)
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <IconButton
                    variant="contained"
                    onClick={() => setLinkTagOpen(true)}
                  >
                    <PlusCircleIcon className="w-8 white" />
                  </IconButton>
                </div>
              </div>
            </Card>
          </div>
          <div className="mt-5 grid grid-cols-3">
            <div className={'col-span-2 pr-8'}>
              <Card padding="none" className="min-h-full">
                <div className="px-2 flex justify-between mt-2">
                  <div className="w-full flex items-center">
                    <ChatBubbleLeftEllipsisIcon className="w-5 h-5 mx-2" />
                    <p className="text-sm font-bold text-slate-600">
                      {intl.formatMessage(detailMessages.transcriptionToText)}
                    </p>
                  </div>
                  {detailByType.transcription.some(
                    (segment) => !segment.transcription
                  ) ? (
                    <Button
                      variant="contained"
                      className="flex items-center"
                      onClick={generateTranscription}
                    >
                      <PencilIcon className="w-5 h-5 mr-2" />
                      {intl.formatMessage(actionsMessages.create)}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className="flex items-center"
                      onClick={() => setShowEditSegments(true)}
                    >
                      <PencilIcon className="w-5 h-5 mr-2" />
                      {intl.formatMessage(actionsMessages.edit)}
                    </Button>
                  )}
                </div>
                <div className="px-6 py-5">
                  {detailByType.transcription.some(
                    (segment) => !segment.transcription
                  ) ? (
                    <Typography>No se encontro la transcripción</Typography>
                  ) : (
                    <TranscriptionBox segments={detailByType.transcription} />
                  )}
                </div>
              </Card>
            </div>
            <Card className="min-h-full">
              {type && type === CallType.TRANSMITTED && (
                <>
                  <div className="w-full flex items-center">
                    <FingerPrintIcon className="w-5 h-5 mx-2" />
                    <p className="text-sm font-bold text-slate-600">
                      {intl.formatMessage(detailMessages.voiceprintSimilarity)}
                    </p>
                  </div>
                  <GaugeChart
                    percentage={detailByType.voiceControlSimilarity * 100}
                    height={200}
                  />
                </>
              )}
              {type && type === CallType.RECEIVED && (
                <ReceivedOptions callId={id} type="RECEIVED_AUDIO" />
              )}
            </Card>
            <div className="col-span-2 pr-8 mt-5 h-full">
              <Card className="min-h-full">
                <div className="w-full flex items-center mb-3">
                  <DocumentTextIcon className="w-5 h-5 mx-2" />
                  <p className="text-sm font-bold text-slate-600">
                    {intl.formatMessage(detailMessages.wordsAbundance)}
                  </p>
                </div>
                <WordCloudChart
                  data={detailByType.wordFrequency}
                  fields={{ name: 'word', value: 'frequency' }}
                />
              </Card>
            </div>
            <Card className="min-h-full mt-5">
              <div className="w-full flex items-center">
                <BookmarkIcon className="w-5 h-5 mx-2" />
                <p className="text-sm font-bold text-slate-600">
                  {intl.formatMessage(detailMessages.wordsAbundance)}
                </p>
              </div>
              <Table
                data={detailByType.wordFrequency}
                columns={overusedPhrasesColumns}
                pageSize={5}
                className="mt-3"
              />
            </Card>
          </div>
        </div>
      )}
      <TagForm
        open={linkTagOpen}
        onClose={() => setLinkTagOpen(false)}
        onSuccess={() => {
          setLinkTagOpen(false)
          actions?.getLinkedTags({ ...dates, id })
        }}
        type={type as CallType}
      />
      <UpdateTranscription
        open={showEditSegments}
        onClose={() => setShowEditSegments(false)}
        segments={detailByType.transcription}
        type={type as CallType}
        onSuccess={() => {
          setShowEditSegments(false)
          actions?.getSegmentList({ ...dates, id })
        }}
      />
    </div>
  )
}

export default InterventionTypeDetail
