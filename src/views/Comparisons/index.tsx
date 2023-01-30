import { QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Card from 'components/Card'
import Divider from 'components/Divider'
import Grid from 'components/Grid'
import RedirectMenu from 'components/SpeakersMenu'
import Title from 'components/Title'
import Tooltip from 'components/Tooltip'
import Typography from 'components/Typography'
import { generalMessages } from 'globalMessages'
import useApi from 'hooks/useApi'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { pathRoute } from 'router/routes'
import LikelihoodScale from './components/LikelihoodScale'
import VoicePrintDetail from './components/VoicePrintDetail'
import VoicePrintSource from './components/VoicePrintSource'
import { messages, messages1To1 } from './messages'
import AreaChart from 'components/Charts/Area'
import { useLocation } from 'react-router-dom'
/* Siempre al último */
// import fake_similarity from 'dumy/fake_similarity.json'

interface LocationState {
  id: string
  name: string
  receiver: string
  date: string
}

export interface Voiceprint {
  id: string
  name: string
  totalAudios?: number
  receiver?: string
  pinNumber?: string
  isoDate?: string
  date: string
  voicePrintSource: 'TRANSMITTED_AUDIO' | 'CONTROL_GROUPS' | 'RECEIVED_AUDIO'
}

const Comparisons = (): ReactElement => {
  const [histogram, setHistogram] = useState<any[]>([])
  const [sourceVoicePrint, setSourceVoicePrint] = useState<Voiceprint | null>(
    null
  )
  const [targetVoicePrint, setTargetVoicePrint] = useState<Voiceprint | null>(
    null
  )
  const [similarity, setSimilarity] = useState<number | null>(null)
  const location = useLocation<LocationState>()

  const { formatMessage } = useIntl()
  const compareVoiceprintsService = useApi({
    endpoint: 'get-comparisons-audio-embeddings',
    method: 'post'
  })
  const getHistogramService = useApi({
    endpoint: 'get-audio-comparison-graph',
    method: 'get'
  })

  const compareVoiceprints = async (): Promise<void> => {
    try {
      if (!sourceVoicePrint || !targetVoicePrint) return

      const sourceType = sourceVoicePrint.voicePrintSource.split('_')[0]
      const targetType = targetVoicePrint.voicePrintSource.split('_')[0]
      const response = await compareVoiceprintsService({
        urlParams: {
          comparison_type: `${sourceType}_${targetType}`
        },
        body: {
          base_id: sourceVoicePrint.id,
          base_vector_type: sourceType,
          objectives: [targetVoicePrint.id],
          objective_type: targetType
        }
      })
      if (response.data && response.data.length > 0) {
        const [comparisonResult] = response.data
        setSimilarity(comparisonResult.similarity)
      }

      await histogramFetch(sourceVoicePrint.id, [targetVoicePrint.id])
    } catch {}
  }

  useEffect(() => {
    const { state } = location
    if (state) {
      setSourceVoicePrint({
        id: state.id,
        name: state.name ?? 'apervox_audio.wav',
        receiver: state.receiver,
        date: state.date,
        voicePrintSource: 'TRANSMITTED_AUDIO'
      })
    }
  }, [])

  const histogramFetch = async (
    base: string,
    targets: string[]
  ): Promise<void> => {
    try {
      const response = await getHistogramService({
        urlParams: {
          audio_base_id: base,
          audio_comparison_id: targets
        }
      })
      setHistogram(response as any)
    } catch {}
  }

  return (
    <div className="w-full h-full">
      <Title>{formatMessage(generalMessages.comparisons)}</Title>
      <Card className="mt-3">
        <div className="flex justify-between">
          <div>
            <Typography variant="subtitle" style="bold">
              {formatMessage(messages.generator)}
            </Typography>
            <Typography variant="body2" className="text-slate-500">
              {formatMessage(messages.comparisonType)}
            </Typography>
          </div>
          <button
            onClick={() => {
              setTargetVoicePrint(null)
              setSourceVoicePrint(null)
              setHistogram([])
              setSimilarity(null)
            }}
          >
            <TrashIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
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
        <Grid>
          <Grid item sm={6} className="border-r-gray-300 border-r px-4">
            <Typography variant="body1" style="semibold">
              {formatMessage(messages.baseVoicePrint)}
            </Typography>
            <VoicePrintSource
              baseVoicePrint
              voicePrint={sourceVoicePrint}
              handleVoicePrint={setSourceVoicePrint}
            />
          </Grid>
          <Grid item sm={6} className="px-4">
            <Typography variant="body1" style="semibold" className="text-right">
              {formatMessage(messages.targetVoicePrint)}
            </Typography>
            <VoicePrintSource
              voicePrint={targetVoicePrint}
              handleVoicePrint={setTargetVoicePrint}
            />
          </Grid>
          <Grid item sm={12}>
            <Divider title={formatMessage(messages1To1.selectedVoicePrints)} />
          </Grid>
          <Grid item sm={6} className="border-r-gray-300 border-r px-4">
            <VoicePrintDetail
              voicePrint={sourceVoicePrint}
              onDelete={() => setSourceVoicePrint(null)}
            />
          </Grid>
          <Grid item sm={6} className="px-4">
            <VoicePrintDetail
              voicePrint={targetVoicePrint}
              align="right"
              onDelete={() => setTargetVoicePrint(null)}
            />
          </Grid>
          <Grid item sm={12}>
            <Divider />
          </Grid>
        </Grid>
        <div className="flex justify-end mt-5">
          <Button
            variant="contained"
            color="indigo"
            disabled={!sourceVoicePrint || !targetVoicePrint}
            onClick={compareVoiceprints}
          >
            {formatMessage(generalMessages.compare)}
          </Button>
        </div>
      </Card>
      <Divider title={formatMessage(generalMessages.results)} />
      <Card>
        <div className="flex items-center">
          <Tooltip
            content={<LikelihoodScale />}
            classNames={{ panel: 'bg-inherit bg-opacity-0' }}
            placement="right"
          >
            <QuestionMarkCircleIcon className="w-5 h-5 mr-3 text-slate-500" />
          </Tooltip>

          <Typography style="semibold">
            {formatMessage(messages1To1.similarityValue, {
              similarity: similarity ?? ''
            })}
          </Typography>
        </div>
        <div className="mt-5">
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
      </Card>
    </div>
  )
}

export default Comparisons
