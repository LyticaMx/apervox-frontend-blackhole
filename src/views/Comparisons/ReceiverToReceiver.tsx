import Card from 'components/Card'
import Divider from 'components/Divider'
import Title from 'components/Title'
import Typography from 'components/Typography'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import MultipleVoicePrintSource from './components/MultipleVoicePrintSource'
import { messages, messagesRToR } from './messages'
import { Voiceprint } from '.'
import { actionsMessages, generalMessages } from 'globalMessages'
import Table from 'components/Table'
import NoData from 'components/NoData'
import useApi from 'hooks/useApi'
import {
  BellIcon,
  CheckIcon,
  LightBulbIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import Button from 'components/Button'
import AssignReceiverDialog from './components/AssignReceiverDialog'

export interface Receiver {
  id: string
  name: string
  pin: number
  receiverPhone: string
  receiver?: string
  date: string
}

interface Result {
  id: string
  targetAudio: string
  similarity: number
  category: string
  receiver: string | null
  pin: number
  receiverPhone: string
  date: string
}

const ReceiverToReceiver = (): ReactElement => {
  const [sourceVoicePrints, setSourceVoicePrints] = useState<Voiceprint[]>([])
  const [targetVoicePrints, setTargetVoicePrints] = useState<Voiceprint[]>([])
  const [audioToLink, setAudioToLink] = useState<Receiver | null>(null)
  const [results, setResults] = useState<Result[]>([])
  const { formatMessage } = useIntl()
  const compareVoiceprintsService = useApi({
    endpoint: 'get-comparisons-audio-embeddings',
    method: 'post'
  })

  const categories = [
    'Indeterminado',
    'Apoyo debil',
    'Apoyo moderado',
    'Apoyo moderado fuerte',
    'Apoyo fuerte',
    'Apoyo muy fuerte',
    'Apoyo extremadamente fuerte'
  ]

  const getResults = async (): Promise<void> => {
    try {
      if (sourceVoicePrints.length === 0 || targetVoicePrints.length === 0) {
        return
      }
      const source = sourceVoicePrints[0]
      const sourceType = source.voicePrintSource.split('_')[0]
      const targetsType = targetVoicePrints[0].voicePrintSource.split('_')[0]
      const response = await compareVoiceprintsService({
        urlParams: {
          comparison_type: `${sourceType}_${targetsType}`
        },
        body: {
          base_id: source.id,
          base_vector_type: sourceType,
          objectives: targetVoicePrints.map((voicePrint) => voicePrint.id),
          objective_type: targetsType
        }
      })
      if (response.data && response.data.length > 0) {
        setResults(
          response.data.map((datum) => {
            const target = targetVoicePrints.find(
              (voiceprint) => voiceprint.id === datum.objective_vector_id
            )
            return {
              id: datum.objective_vector_id,
              targetAudio: target?.name ?? '',
              similarity: datum.similarity,
              category:
                categories[
                  Math.floor(
                    Math.random() * datum.similarity * categories.length
                  )
                ],
              receiver: null,
              date: target?.date ?? '',
              pin: target?.pinNumber ?? 0,
              receiverPhone: target?.receiver ?? ''
            }
          })
        )
      } else {
        setResults([])
      }
    } catch {}
  }

  const linkReceiver = (receiver: Receiver): void => {
    console.log(receiver)
  }

  return (
    <div className="w-full h-full">
      <AssignReceiverDialog
        onClose={() => setAudioToLink(null)}
        onAccept={linkReceiver}
        audioToLink={audioToLink}
      />
      <Title>{formatMessage(messagesRToR.title)}</Title>
      <Typography variant="body2" style="light" className="text-gray-500">
        {formatMessage(messagesRToR.subtitle)}
      </Typography>
      <Card className="mt-8">
        <div className="p-4 bg-slate-100 rounded mb-4">
          <Typography
            variant="subtitle"
            style="bold"
            className="tracking-widest"
          >
            {formatMessage(messagesRToR.sampleSelection)}
          </Typography>
          <div className="flex mt-1 items-center">
            <LightBulbIcon className="w-5 h-5 text-sky-500" />
            <Typography variant="body2" className="text-slate-500 ml-2">
              {formatMessage(messagesRToR.forEasySelection)}
            </Typography>
          </div>
        </div>

        <Typography variant="subtitle" style="semibold" className="mb-4">
          {formatMessage(messages.baseVoicePrint)}
        </Typography>
        <MultipleVoicePrintSource
          voicePrints={sourceVoicePrints}
          handleVoicePrint={setSourceVoicePrints}
          single
          filterDetails
          receiver
        />
        <Divider />
        <Typography variant="subtitle" style="semibold" className="mb-4">
          {formatMessage(messages.targetVoicePrint)}
        </Typography>
        <MultipleVoicePrintSource
          voicePrints={targetVoicePrints}
          handleVoicePrint={setTargetVoicePrints}
          filterDetails
          receiver
        />
        <Divider />
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="indigo"
            disabled={
              sourceVoicePrints.length === 0 || targetVoicePrints.length === 0
            }
            onClick={getResults}
          >
            {formatMessage(generalMessages.compare)}
          </Button>
        </div>
      </Card>
      <Divider title={formatMessage(generalMessages.results)} />
      <Card>
        <div className="p-4 bg-slate-100 rounded mb-4">
          <Typography
            variant="title"
            style="semibold"
            className="tracking-widest"
          >
            {formatMessage(messagesRToR.results)}
          </Typography>
          <div className="flex mt-1 items-center">
            <LightBulbIcon className="w-5 h-5 text-sky-500" />
            <Typography variant="body2" className="text-slate-500 ml-2">
              {formatMessage(messagesRToR.resultsDescription)}
            </Typography>
          </div>
        </div>
        {results.length > 0 ? (
          <div>
            <Table
              data={results}
              columns={[
                {
                  header: formatMessage(messagesRToR.targetAudio),
                  accessorKey: 'targetAudio'
                },
                {
                  header: formatMessage(generalMessages.similarity),
                  accessorKey: 'similarity',
                  cell: ({ getValue }) => `${(getValue() * 100).toFixed(2)}%`
                },
                {
                  header: formatMessage(generalMessages.category),
                  accessorKey: 'category'
                },
                {
                  header: formatMessage(generalMessages.receiver),
                  accessorKey: 'receiver',
                  cell: ({ getValue }) =>
                    getValue() || (
                      <span className="text-sky-500">
                        {formatMessage(generalMessages.unknown)}
                      </span>
                    )
                },
                {
                  header: formatMessage(generalMessages.actions),
                  cell: ({ row }) => {
                    const { original } = row
                    if (original.receiver) {
                      return (
                        <button className="text-sky-600 bg-sky-100 px-3 py-2 flex items-center rounded-md hover:bg-sky-200 transition-colors duration-200">
                          <BellIcon className="h-5 w-5 mr-1" />
                          <CheckIcon className="h-4 w-4 mr-1" />
                          {formatMessage(actionsMessages.verify)}
                        </button>
                      )
                    } else {
                      return (
                        <Button
                          color="sky"
                          variant="outlined"
                          onClick={() => {
                            setAudioToLink({
                              date: original.date,
                              id: original.id,
                              name: original.targetAudio,
                              pin: original.pin,
                              receiverPhone: original.receiverPhone
                            })
                          }}
                        >
                          <UserCircleIcon className="h-4 w-4 mr-1" />
                          {formatMessage(actionsMessages.assign)}
                        </Button>
                      )
                    }
                  }
                },
                {
                  header: ' ',
                  cell: () => (
                    <button className="text-sky-500 font-bold">
                      {formatMessage(generalMessages.details)}
                    </button>
                  )
                }
              ]}
            />
          </div>
        ) : (
          <NoData />
        )}
      </Card>
    </div>
  )
}

export default ReceiverToReceiver
