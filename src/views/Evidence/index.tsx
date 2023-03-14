import Button from 'components/Button'
import Grid from 'components/Grid'
import ImageEditor from 'components/ImageEditor'
import { FormikContextType } from 'formik'
import { ReactElement, useMemo, useRef } from 'react'
import EventInformation, {
  EvidenceData,
  FormValues as EventClassificationValues
} from './components/EventInformation'
import { useIntl } from 'react-intl'
import { messages } from './messages'
import { useLocation } from 'react-router-dom'
import { BsSkipEnd, BsSkipStart } from 'react-icons/bs'
import VideoPlayer from 'components/VideoPlayer'
import Typography from 'components/Typography'
import ToolTabs, { ToolTab } from './components/ToolTabs'
import SynopsisEditor from './components/SynopsisEditor'
import { DecoupledEditor } from 'types/richTextEditor'
import EventHistory from './components/EventHistory'
import { generalMessages, platformMessages } from 'globalMessages'
import { NonEmptyArray } from 'types/utils'
import { useLanguage } from 'context/Language'
import Comments from './components/Comments'
import LocationInformation from './components/LocationInformation'
import TranscriptionTab from './components/TranscriptionTab'

interface EvidenceLocation {
  type: 'audio' | 'video' | 'image' | 'doc'
}

const Evidence = (): ReactElement => {
  const { formatMessage } = useIntl()
  const location = useLocation<EvidenceLocation>()
  const { localeI18n } = useLanguage()
  const formikRef = useRef<FormikContextType<EventClassificationValues>>()
  const synopsisRef = useRef<DecoupledEditor>(null)

  const eventInformation = useMemo<EvidenceData>(() => {
    switch (location.state?.type) {
      case 'audio':
        return {
          id: 'A001',
          tiName: 'T.I.242/2022-2',
          startDate: '2023-03-07T15:17:26.308Z',
          duration: 180,
          targetPhone: '5563456789'
        }
      case 'video':
        return {
          id: 'V003',
          filename: 'V003...55ydhfj.mp4',
          sourceDevice: 'Laptop forense',
          tiName: 'T.I.242/2022-2',
          startDate: '2023-03-07T15:17:26.308Z',
          endDate: '2023-03-07T16:17:26.308Z',
          duration: 3600
        }
      case 'image':
        return {
          id: 'I002',
          filename: 'captura...002.jpg',
          sourceDevice: 'Laptop forense',
          tiName: 'T.I.242/2022-2',
          startDate: '2023-03-07T15:17:26.308Z'
        }
      case 'doc': {
        return {
          id: 'DOO4',
          filename: 'documento...12.pdf',
          sourceDevice: 'Laptop forense',
          startDate: '2023-03-07T15:17:26.308Z',
          tiName: 'T.I.242/2022-2'
        }
      }
      default:
        return {
          id: 'EV000',
          tiName: 'BH_TI',
          startDate: '2023-03-07T15:17:26.308Z'
        }
    }
  }, [])

  const toolTabs = useMemo<NonEmptyArray<ToolTab>>(() => {
    const tabs: NonEmptyArray<ToolTab> = [
      {
        id: 'synopsis',
        name: formatMessage(platformMessages.synopsis),
        component: (
          <SynopsisEditor editorRef={synopsisRef} initialData="Data inicial" />
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
  }, [localeI18n, location.state.type])

  return (
    <div>
      <div className="mb-2 flex justify-between items-center mr-6">
        <div>
          <Typography
            variant="subtitle"
            className="text-secondary uppercase font-[900]"
          >
            {`${eventInformation.id} ${formatMessage(messages.eventType, {
              type: location.state.type
            })}`}
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
            onSubmit={(values) => console.log(values)}
            evidenceData={eventInformation}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Evidence
