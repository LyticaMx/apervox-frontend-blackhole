import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import NavOptions from './components/NavOptions'
import Typography from 'components/Typography'
import { mediaMessages } from './messages'
import MediaTab from './components/MediaTab'
import CarrierTab from './components/CarrierTab'
import DeviceTab from './components/DeviceTab'
import clsx from 'clsx'

interface MediaType {
  id: string
  name: string
  date: string
}

export interface Media extends MediaType {
  type: 'media'
}

export interface Carrier extends MediaType {
  type: 'carrier'
}
export interface Device extends MediaType {
  deviceName: string
  type: 'device'
}

const MediaComponent = (): ReactElement => {
  const { formatMessage } = useIntl()
  const [mediaTab, setMediaTab] = useState<'media' | 'carrier' | 'device'>(
    'media'
  )

  const renderTab = (): ReactElement => {
    switch (mediaTab) {
      case 'media':
        return <MediaTab />
      case 'carrier':
        return <CarrierTab />
      case 'device':
        return <DeviceTab />
      default:
        return <MediaTab />
    }
  }

  return (
    <div>
      <NavOptions />
      <div className="mt-2">
        <button
          className={clsx(
            'mr-2 px-2 rounded-md hover:bg-sky-50',
            mediaTab === 'media' && 'bg-primary-50'
          )}
          onClick={() => setMediaTab('media')}
        >
          <Typography
            variant="subtitle"
            className={clsx(
              'uppercase font-semibold',
              mediaTab === 'media' ? '!text-primary' : 'text-secondary'
            )}
          >
            {formatMessage(mediaMessages.mediaCounter, { media: '04' })}
          </Typography>
        </button>
        <button
          onClick={() => setMediaTab('device')}
          className={clsx(
            'mr-2 px-2 rounded-md hover:bg-sky-50',
            mediaTab === 'device' && 'bg-primary-50'
          )}
        >
          <Typography
            variant="subtitle"
            className={clsx(
              'uppercase font-semibold',
              mediaTab === 'device' ? '!text-primary' : 'text-secondary'
            )}
          >
            {formatMessage(mediaMessages.deviceCounter, { devices: '01' })}
          </Typography>
        </button>
        <button
          onClick={() => setMediaTab('carrier')}
          className={clsx(
            'mr-2 px-2 rounded-md hover:bg-sky-50',
            mediaTab === 'carrier' && 'bg-primary-50'
          )}
        >
          <Typography
            variant="subtitle"
            className={clsx(
              'uppercase font-semibold',
              mediaTab === 'carrier' ? '!text-primary' : 'text-secondary'
            )}
          >
            {formatMessage(mediaMessages.carrierCounter, { carriers: '03' })}
          </Typography>
        </button>
      </div>
      <div>{renderTab()}</div>
    </div>
  )
}

export default MediaComponent
