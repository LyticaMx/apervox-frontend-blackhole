import Button from 'components/Button'
import Grid from 'components/Grid'
import ImageEditor from 'components/ImageEditor'
import { FormikContextType } from 'formik'
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import EventInformation, {
  FormValues as EventClassificationValues
} from './components/EventInformation'
import { useIntl } from 'react-intl'
import { messages } from './messages'
import { useHistory, useLocation } from 'react-router-dom'
import { BsSkipEnd, BsSkipStart } from 'react-icons/bs'
import VideoPlayer from 'components/VideoPlayer'
import Typography from 'components/Typography'
import ToolTabs, { ToolTab } from './components/ToolTabs'
import SynopsisEditor from './components/SynopsisEditor'
import EventHistory from './components/EventHistory'
import { generalMessages, platformMessages } from 'globalMessages'
import { NonEmptyArray } from 'types/utils'
import { useLanguage } from 'context/Language'
import Comments from './components/Comments'
import LocationInformation from './components/LocationInformation'
import TranscriptionTab from './components/TranscriptionTab'
import { Editor } from '@ghostramses/ckeditor5-blackhole-custom-build/build/ckeditor'
import { PDFViewer } from 'components/PDFViewer'
import PlanckTeory from 'assets/demo/Teoria_Planck.pdf'
import WaveSurfer from 'components/WaveSurferContext'
import { useWorkingEvidence } from 'context/WorkingEvidence'
import { pathRoute } from 'router/routes'
import useToast from 'hooks/useToast'
import { RegionInterface } from 'components/WaveSurferContext/types'
import { UpdateData } from 'context/WorkingEvidence/types'

interface EvidenceLocation {
  type: 'audio' | 'video' | 'image' | 'doc'
  from?: 'technique' | 'monitor'
}

const CLASSIFICATION_VALUES = [
  'unclassified',
  'discarded',
  'not_relevant',
  'relevant'
]

const Evidence = (): ReactElement => {
  const [regions, setRegions] = useState<RegionInterface[]>([])
  const { formatMessage } = useIntl()
  const location = useLocation<EvidenceLocation>()
  const { localeI18n } = useLanguage()
  const formikRef = useRef<FormikContextType<EventClassificationValues>>()
  const synopsisRef = useRef<Editor>(null)
  const history = useHistory()
  const workingEvidence = useWorkingEvidence()
  const { launchToast } = useToast()

  const saveSynopsis = async (): Promise<void> => {
    try {
      const saved =
        (await workingEvidence.actions?.updateSynopsis(
          synopsisRef.current?.getData() ?? ''
        )) ?? false
      if (saved) {
        launchToast({
          title: 'Sinopsis guardada correctamente',
          type: 'Success'
        })
        return
      }
      launchToast({
        title: 'No se pudo guardar la sinopsis',
        type: 'Danger'
      })
    } catch {
      launchToast({
        title: 'No se pudo guardar la sinopsis',
        type: 'Danger'
      })
    }
  }

  const updateEvidenceClassification = async (
    data: EventClassificationValues
  ): Promise<void> => {
    try {
      const updateBody: UpdateData = {
        classification: CLASSIFICATION_VALUES[data.classification] as any,
        isTracked: data.follow
      }

      if (data['label-manual']) updateBody.customLabel = data.label
      else updateBody.label = data.label

      const saved =
        (await workingEvidence.actions?.classifyEvidence(updateBody)) ?? false

      if (saved) {
        launchToast({
          title: 'Evidencia clasificada correctamente',
          type: 'Success'
        })
      } else {
        launchToast({
          title: 'No se pudo clasificar la evidencia',
          type: 'Danger'
        })
      }
    } catch {}

    try {
      const updatedRegions =
        (await workingEvidence.actions?.updateRegions(
          regions.map((region) => ({
            id: region.id,
            tag: region.name,
            startTime: region.start,
            endTime: region.end
          }))
        )) ?? false
      if (updatedRegions) {
        launchToast({
          title: 'Sinopsis guardada correctamente',
          type: 'Success'
        })
      } else {
        launchToast({
          title: 'No se pudieron actualizar las regiones',
          type: 'Danger'
        })
      }
    } catch {}

    // TODO: Implementar logica de generación de transcripciones
  }

  const getRegions = async (): Promise<void> => {
    try {
      const regions = (await workingEvidence.actions?.getRegions()) ?? []
      setRegions(
        regions.map((region) => ({
          id: region.id ?? '',
          start: region.startTime,
          end: region.endTime,
          name: region.tag
        }))
      )
    } catch {}
  }

  useEffect(() => {
    if (!workingEvidence.id) {
      if (location.state.from === 'technique') {
        history.push(pathRoute.technique)
      } else history.push(pathRoute.monitoring.history)
      return
    }
    workingEvidence.actions?.getData()
  }, [workingEvidence.id])

  useEffect(() => {
    if (location.state.type !== 'audio') return
    getRegions()
  }, [location.state.type])

  const toolTabs = useMemo<NonEmptyArray<ToolTab>>(() => {
    const tabs: NonEmptyArray<ToolTab> = [
      {
        id: 'synopsis',
        name: formatMessage(platformMessages.synopsis),
        component: (
          <SynopsisEditor editorRef={synopsisRef} saveSynopsis={saveSynopsis} />
        )
      },
      {
        id: 'event-history',
        name: formatMessage(messages.eventHistory),
        component: <EventHistory />
      },
      {
        id: 'comments',
        name: formatMessage(generalMessages.comments),
        component: <Comments />
      }
    ]

    if (location.state.type === 'audio' || location.state.type === 'video') {
      tabs.splice(1, 0, {
        id: 'transcripcion',
        component: <TranscriptionTab />,
        name: 'Transcripción'
      })
    }

    if (location.state.type === 'audio') {
      tabs.push({
        id: 'location',
        name: formatMessage(generalMessages.location),
        component: (
          <LocationInformation
            cellId="135098745"
            carrier="Telcel"
            country="México"
            date="2022-10-01T15:00:00.000Z"
            address="Calle 18 #1200."
            settlement="San Pedro de los Pinos, C.P. 03800"
            municipality="Álcaldía Álvaro Obregón, CDMX."
            geoReference={{
              latitude: 19.387267,
              longitude: -99.187596,
              startAngle: 70,
              stopAngle: 165
            }}
          />
        )
      })
    }

    return tabs
  }, [localeI18n, location.state.type, workingEvidence.id])

  return (
    <div>
      <div className="mb-2 flex justify-between items-center mr-6">
        <div>
          <Typography
            variant="subtitle"
            className="text-secondary uppercase font-[900]"
          >
            {`${workingEvidence.evidenceNumber} ${formatMessage(
              messages.eventType,
              {
                type: location.state.type
              }
            )}`}
          </Typography>
        </div>
        <div className="flex gap-3 items-center">
          <button className="p-1 w-8 h-8 bg-white shadow-md border rounded-md text-secondary-gray hover:enabled:text-secondary">
            <BsSkipStart className="h-6 w-6" />
          </button>
          <button className="p-1 w-8 h-8 bg-white shadow-md border rounded-md text-secondary-gray hover:enabled:text-secondary">
            <BsSkipEnd className="h-6 w-6" />
          </button>
          <Button
            variant="contained"
            color="primary"
            className="!py-1 !px-3"
            onClick={() => formikRef.current?.submitForm()}
          >
            {formatMessage(messages.saveEvidence)}
          </Button>
        </div>
      </div>
      <Grid spacing={2} className="">
        <Grid item xs={12} lg={9}>
          <div className="bg-white rounded-md shadow-md p-3">
            {location.state.type === 'image' && (
              <ImageEditor imageUrl="https://cl.buscafs.com/www.tomatazos.com/public/uploads/images/215018/215018_800x480.jpg" />
            )}
            {location.state.type === 'video' && (
              <VideoPlayer videoUrl="http://media.w3.org/2010/05/bunny/movie.mp4" />
            )}
            {location.state.type === 'doc' && <PDFViewer file={PlanckTeory} />}
            {location.state.type === 'audio' && (
              <WaveSurfer
                plugins={['Regions', 'Timeline', 'Minimap']}
                audio={{
                  url: workingEvidence.actions?.getAudioUrl() ?? '',
                  peek: workingEvidence.actions?.getAudioWave()
                }}
                onDownload={async () => {
                  console.log('hola')
                }}
                regions={regions}
                splitChannels
                showEqualizer
                showMinimap
                showWave
                showTimeline
                showZoom
              />
            )}
          </div>
          <div className="bg-white rounded-md shadow-md p-3 mt-4">
            <Typography
              variant="subtitle"
              className="uppercase text-secondary"
              style="bold"
            >
              {formatMessage(messages.evidenceWorkingTools)}
            </Typography>
            <div className="mt-2">
              <ToolTabs tabs={toolTabs} />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={3}>
          <EventInformation
            formikRef={formikRef}
            onSubmit={updateEvidenceClassification}
            evidenceData={workingEvidence}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Evidence
