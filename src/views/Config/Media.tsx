import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import NavOptions from './components/NavOptions'
import Typography from 'components/Typography'
import { mediaMessages } from './messages'
import MediaTab from './components/MediaTab'
import CarrierTab from './components/CarrierTab'
import DeviceTab from './components/DeviceTab'
import clsx from 'clsx'
import { useTabs } from 'hooks/useTabs'

const MediaComponent = (): ReactElement => {
  const { formatMessage } = useIntl()
  const types = {
    media: mediaMessages.mediaCounter,
    carrier: mediaMessages.carrierCounter,
    device: mediaMessages.deviceCounter
  }

  const [active, setActive, Content] = useTabs<'media' | 'carrier' | 'device'>(
    'media'
  )

  return (
    <div>
      <NavOptions />
      <div className="mt-2">
        {Object.entries(types).map(([tab, message], index) => (
          <button
            key={index}
            className={clsx(
              'mr-2 px-2 rounded-md hover:bg-sky-50',
              active === 'media' && 'bg-primary-50'
            )}
            onClick={() => setActive(tab)}
          >
            <Typography
              variant="subtitle"
              className={clsx(
                'uppercase font-semibold text-sm',
                active === tab ? '!text-primary' : 'text-secondary'
              )}
            >
              {formatMessage(message, { counter: '04' })}
            </Typography>
          </button>
        ))}
      </div>

      <Content value="media">
        <MediaTab />
      </Content>
      <Content value="carrier">
        <CarrierTab />
      </Content>
      <Content value="device">
        <DeviceTab />
      </Content>
    </div>
  )
}

export default MediaComponent
