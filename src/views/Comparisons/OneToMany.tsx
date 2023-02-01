import Card from 'components/Card'
import Divider from 'components/Divider'
import RedirectMenu from 'components/SpeakersMenu'
import Title from 'components/Title'
import Typography from 'components/Typography'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { pathRoute } from 'router/routes'
import MultipleVoicePrintSource from './components/MultipleVoicePrintSource'
import { messages } from './messages'
import { Voiceprint } from '.'
import Button from 'components/Button'
import { generalMessages } from 'globalMessages'
import AreaChart from 'components/Charts/Area'
import Table from 'components/Table'
import NoData from 'components/NoData'
import clsx from 'clsx'
import useApi from 'hooks/useApi'
/* Siempre al último */
// import fake_similarity from 'dumy/fake_similarity.json'

interface Result {
  targetVoiceprint: string
  similarity: number
  category: string
  baseId: string
  objectiveId: string
}

const OneToMany = (): ReactElement => {
  const [sourceVoicePrints, setSourceVoicePrints] = useState<Voiceprint[]>([])
  const [targetVoicePrints, setTargetVoicePrints] = useState<Voiceprint[]>([])
  const [sourceResult, setSourceResult] = useState<Voiceprint | null>(null)
  const [results, setResults] = useState<Result[]>([])
  const [histogram, setHistogram] = useState<any[]>([])
  const { formatMessage } = useIntl()
  const compareVoiceprintsService = useApi({
    endpoint: 'get-comparisons-audio-embeddings',
    method: 'post'
  })
  const getHistogramService = useApi({
    endpoint: 'get-audio-comparison-graph',
    method: 'get'
  })
  const sourceBorderColor = {
    TRANSMITTED_AUDIO: 'border-l-teal-400',
    CONTROL_GROUPS: 'border-l-violet-500'
  }

  const histogramFetch = async (
    base: string,
    targets: string[]
  ): Promise<void> => {
    try {
      if (base === '') return
      const response = await getHistogramService({
        urlParams: {
          audio_base_id: base,
          audio_comparison_id: targets
        }
      })
      setHistogram(response as any)
    } catch {}
  }

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
      setHistogram([])
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
              targetVoiceprint: target?.name,
              similarity: datum.similarity,
              baseId: datum.base_vector_id,
              objectiveId: datum.objective_vector_id,
              category:
                categories[
                  Math.floor(
                    Math.random() * datum.similarity * categories.length
                  )
                ]
            }
          })
        )
      } else {
        setResults([])
      }
      setSourceResult(source)
    } catch {}
  }

  return (
    <div className="w-full h-full">
      <Title>{formatMessage(generalMessages.comparisons)}</Title>
      <Card className="mt-3">
        <Typography variant="subtitle" style="bold">
          {formatMessage(messages.generator)}
        </Typography>
        <Typography variant="body2" className="text-slate-500">
          {formatMessage(messages.comparisonType)}
        </Typography>
        <RedirectMenu
          items={[
            {
              text: '1:1',
              to: pathRoute.comparisons.oneToOne
            },
            {
              text: '1:N',
              to: pathRoute.comparisons.oneToMany
            }
          ]}
        />
        <Divider title={formatMessage(messages.selectSamples)} />
        <Typography variant="subtitle" style="semibold" className="mb-4">
          {formatMessage(messages.baseVoicePrint)}
        </Typography>
        <MultipleVoicePrintSource
          voicePrints={sourceVoicePrints}
          handleVoicePrint={setSourceVoicePrints}
          single
        />
        <Divider />
        <Typography variant="subtitle" style="semibold" className="mb-4">
          {formatMessage(messages.targetVoicePrint)}
        </Typography>
        <MultipleVoicePrintSource
          voicePrints={targetVoicePrints}
          handleVoicePrint={setTargetVoicePrints}
        />
        <Divider />
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="indigo"
            disabled={
              sourceVoicePrints.length === 0 ||
              targetVoicePrints.length === 0 ||
              (sourceVoicePrints[0].voicePrintSource === 'CONTROL_GROUPS' &&
                targetVoicePrints[0].voicePrintSource === 'CONTROL_GROUPS')
            }
            onClick={getResults}
          >
            {formatMessage(generalMessages.compare)}
          </Button>
        </div>
      </Card>
      <Divider title={formatMessage(generalMessages.results)} />
      <Card>
        {results.length > 0 ? (
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-6">
              <div
                className={clsx(
                  'border-l-4 px-3 my-5 bg-slate-50 inline-block',
                  sourceBorderColor[
                    sourceResult?.voicePrintSource ?? 'TRANSMITTED_AUDIO'
                  ]
                )}
              >
                <Typography className="slate-600" style="semibold">
                  {sourceResult?.name}{' '}
                  <span className="font-light text-slate-400">
                    {formatMessage(messages.selectedBaseVoiceprint)}
                  </span>
                </Typography>
              </div>
              <Table
                data={results}
                columns={[
                  {
                    header: formatMessage(messages.targetVoicePrint),
                    accessorKey: 'targetVoiceprint'
                  },
                  {
                    header: formatMessage(generalMessages.similarity),
                    accessorKey: 'similarity'
                  },
                  {
                    header: formatMessage(generalMessages.category),
                    accessorKey: 'category'
                  },
                  {
                    header: ' ',
                    cell: ({ row }) => (
                      <button
                        className="text-blue-500 font-bold"
                        onClick={async () =>
                          await histogramFetch(row.original.baseId, [
                            row.original.objectiveId
                          ])
                        }
                      >
                        {formatMessage(generalMessages.details)}
                      </button>
                    )
                  }
                ]}
              />
            </div>
            <div className="col-span-4">
              <AreaChart
                data={histogram}
                fields={{
                  x: 'similarity',
                  y: 'key',
                  serie: 'type'
                }}
                slideBar
              />
            </div>
          </div>
        ) : (
          <NoData />
        )}
      </Card>
    </div>
  )
}

export default OneToMany
