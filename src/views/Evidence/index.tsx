import Button from 'components/Button'
import Grid from 'components/Grid'
import ImageEditor from 'components/ImageEditor'
import { FormikContextType } from 'formik'
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
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
import { TranscriptionRegion } from './components/TranscriptionRegion'
import asRegion from 'components/WaveSurferContext/hoc/asRegion'
import { DeleteRegionDialog } from './components/DeleteRegionDialog'
import { useTechnique } from 'context/Technique'
import { useLockEvidence } from './hooks/useLockEvidence'

interface EvidenceLocation {
  type: 'audio' | 'video' | 'image' | 'doc'
  from?: 'technique' | 'monitor'
}

type ResolveDeleteRegion = (value: boolean | PromiseLike<boolean>) => void

const CLASSIFICATION_VALUES = [
  'unclassified',
  'discarded',
  'not_relevant',
  'relevant'
]

const Evidence = (): ReactElement => {
  const [commonRegions, setCommonRegions] = useState<RegionInterface[]>([])
  const [transcriptionRegions, setTranscriptionRegions] = useState<
    RegionInterface[]
  >([])
  const [peek, setPeek] = useState<number[]>([]) // Es más facil descargar un state de 2 megas xD
  const [resolveRegion, setResolveRegion] =
    useState<ResolveDeleteRegion | null>(null)
  const [currentTab, setCurrentTab] = useState('synopsis')
  const { formatMessage } = useIntl()
  const location = useLocation<EvidenceLocation>()
  const { localeI18n } = useLanguage()
  const formikRef = useRef<FormikContextType<EventClassificationValues>>()
  const synopsisRef = useRef<Editor>(null)
  const history = useHistory()
  const workingEvidence = useWorkingEvidence()
  const { techniqueId } = useTechnique()
  const { launchToast } = useToast()
  const wavesurferRef = useRef<any>() // obtener el tipo del objeto
  const canWork = useLockEvidence(
    workingEvidence.id ?? '',
    location.state.from ?? 'monitor',
    techniqueId
  )

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
          commonRegions.map((region) => ({
            id: region.id,
            tag: region.data?.name ?? '',
            startTime: region.start,
            endTime: region.end
          }))
        )) ?? false
      if (updatedRegions) {
        launchToast({
          title: 'Regiones guardadas correctamente',
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

  const getPeaks = async (): Promise<void> => {
    try {
      const peaks = (await workingEvidence.actions?.getAudioWave()) ?? []
      setPeek(peaks)
    } catch {}
  }

  const getRegions = async (): Promise<void> => {
    try {
      const regions = (await workingEvidence.actions?.getRegions()) ?? []
      setCommonRegions(
        regions.map<RegionInterface>((region) => ({
          id: region.id ?? '',
          start: region.startTime,
          end: region.endTime,
          data: { name: region.tag }
        }))
      )
    } catch {
      setCommonRegions([])
    }

    try {
      const regions =
        (await workingEvidence.actions?.getTranscriptionSegments()) ?? []
      setTranscriptionRegions(
        // TODO: hacer un map antes de enviar al wavesurfer
        regions.map<RegionInterface>((region) => {
          return {
            id: region.id ?? '',
            start: region.startTime,
            end: region.endTime,
            data: { text: region.text }
          }
        })
      )
    } catch {
      setTranscriptionRegions([])
    }
  }

  const updateTranscription = async (): Promise<void> => {
    try {
      const regionsToUpdate = transcriptionRegions.map((region) => {
        if (!region.id.startsWith('wavesurfer')) {
          return {
            id: region.id,
            startTime: region.start,
            endTime: region.end,
            text: region.data?.text ?? ''
          }
        }

        return {
          startTime: region.start,
          endTime: region.end,
          text: region.data?.text ?? ''
        }
      })

      const updated =
        (await workingEvidence.actions?.updateTranscriptionSegments(
          regionsToUpdate
        )) ?? []

      setTranscriptionRegions(
        updated.map<RegionInterface>((region) => {
          return {
            id: region.id ?? '',
            start: region.startTime,
            end: region.endTime,
            data: { text: region.text }
          }
        })
      )
    } catch {}
  }

  const regions = useMemo(
    () =>
      currentTab === 'transcription'
        ? transcriptionRegions.map((region) =>
            Object.assign({}, region, {
              data: { id: region.id ?? '' }
            })
          )
        : commonRegions,
    [currentTab]
  )

  useEffect(() => {
    if (!canWork) return
    if (!workingEvidence.id) {
      if (location.state.from === 'technique') {
        history.push(pathRoute.technique)
      } else history.push(pathRoute.monitoring.history)
      return
    }
    workingEvidence.actions?.getData()
    getPeaks()
  }, [workingEvidence.id, canWork])

  useEffect(() => {
    if (!canWork) return
    if (location.state.type !== 'audio') return
    getRegions()
  }, [location.state.type, canWork])

  const handleChangeTab = (newTab: string): void => {
    setCurrentTab((actualTab) => {
      if (actualTab !== newTab) {
        const regions = wavesurferRef.current.regions.map((region) => {
          const savedRegion: RegionInterface = {
            id: region.id,
            start: region.start,
            end: region.end
          }

          if (region.data?.name) {
            savedRegion.data = { name: region?.data?.name }
          } else if (region.data?.id) {
            savedRegion.data = {
              // buscar como reducir el find
              text: transcriptionRegions.find((item) => item.id === region.id)
                ?.data?.text
            }
          }

          return savedRegion
        })
        if (actualTab === 'transcription') {
          setTranscriptionRegions(regions)
        } else {
          setCommonRegions(regions)
        }
      }
      return newTab
    })
  }

  // TODO: Agregar dependencias de acciones de transcripción
  const handleTranscript = useCallback(
    async (
      regionId: string,
      start: number,
      end: number
    ): Promise<string | null> => {
      if (regionId.startsWith('wavesurfer')) {
        const updated =
          (await workingEvidence.actions?.updateTranscriptionSegments([
            {
              text: '',
              startTime: start,
              endTime: end
            }
          ])) ?? []
        if (updated.length > 0) {
          const actualRegions = transcriptionRegions.map((item) => item.id)
          const last = updated.find(
            (region) => !actualRegions.includes(region.id ?? '')
          )
          if (!last) return null
          setTranscriptionRegions(
            transcriptionRegions
              .concat([
                {
                  id: last.id ?? '',
                  start: last.startTime,
                  end: last.endTime,
                  data: { text: '' }
                }
              ])
              .sort((a, b) => a.start - b.start)
          )
          return last.id ?? regionId
        }
      } else {
        // Se manda a generar transcripción automática de actualización
        setTranscriptionRegions(
          transcriptionRegions
            .map((region) =>
              region.id === regionId ? { ...region, start, end } : region
            )
            .sort((a, b) => a.start - b.start)
        )
        console.log('Actualizar region desde back') // TODO: Transcripciones automáticas
      }

      return regionId
    },
    [transcriptionRegions]
  )

  const deleteTranscript = useCallback(
    async (regionId: string) => {
      try {
        let deleted = true
        if (!regionId.startsWith('wavesurfer')) {
          const canBeDeleted = await new Promise<boolean>((resolve) => {
            setResolveRegion(() => resolve)
          })
          if (canBeDeleted) {
            deleted =
              (await workingEvidence.actions?.deleteTranscriptionSegment(
                regionId
              )) ?? false
          } else deleted = false
        }
        if (deleted) {
          setTranscriptionRegions(
            transcriptionRegions.filter((region) => region.id !== regionId)
          )
        }

        return deleted
      } catch {
        return false
      }
    },
    [transcriptionRegions]
  )

  const handleChangeSegment = (id: string, value: string): void => {
    setTranscriptionRegions((regions) =>
      regions.map((region) =>
        region.id === id ? { ...region, data: { text: value } } : region
      )
    )
  }

  const CustomRegion = useMemo(
    () =>
      asRegion((props) => (
        <TranscriptionRegion
          {...props}
          transcript={handleTranscript}
          deleteTranscript={deleteTranscript}
        />
      )),
    [handleTranscript, deleteTranscript]
  )

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
        id: 'transcription',
        component: (
          <TranscriptionTab
            onSave={updateTranscription}
            transcriptionSegments={transcriptionRegions}
            onChangeSegment={handleChangeSegment}
          />
        ),
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
  }, [
    localeI18n,
    location.state.type,
    workingEvidence.id,
    transcriptionRegions
  ])

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
        <DeleteRegionDialog
          open={Boolean(resolveRegion)}
          onAccept={() => {
            resolveRegion?.(true)
            setResolveRegion(null)
          }}
          onClose={() => {
            resolveRegion?.(false)
            setResolveRegion(null)
          }}
        />
        <div className="flex gap-3 items-center">
          <button
            className="p-1 w-8 h-8 bg-white shadow-md border rounded-md text-secondary-gray hover:enabled:text-secondary"
            onClick={() => history.replace(pathRoute.technique)}
          >
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
                  peek
                }}
                onDownload={async () => {
                  console.log('hola')
                }}
                regions={regions}
                CustomRegion={
                  currentTab === 'transcription' ? CustomRegion : undefined
                }
                splitChannels
                showEqualizer
                showMinimap
                showWave
                showTimeline
                showZoom
                wsRef={(ws) => {
                  wavesurferRef.current = ws
                }}
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
              <ToolTabs
                tabs={toolTabs}
                current={currentTab}
                onChangeTab={handleChangeTab}
              />
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
