import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import NavOptions from './components/NavOptions'
// import Typography from 'components/Typography'
import { mediaMessages } from './messages'
import MediaTab from './components/MediaTab'
import CarrierTab from './components/CarrierTab'
import DeviceTab from './components/DeviceTab'
import clsx from 'clsx'
import { useTabs } from 'hooks/useTabs'

const MediaComponent = (): ReactElement => {
  const { formatMessage } = useIntl()
  const types = {
    media: mediaMessages.mediaTab,
    carrier: mediaMessages.carrierTab,
    device: mediaMessages.deviceTab
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
              'text-secondary-gray mr-5 font-medium px-2 py-1 rounded-md hover:bg-[#F4F9FF] hover:text-primary',
              active === tab && 'bg-[#F4F9FF] !text-primary'
            )}
            onClick={() => setActive(tab)}
          >
            {/* <Typography
              variant="subtitle"
              className={clsx(
                'uppercase font-semibold text-sm',
                active === tab ? '!text-primary' : 'text-secondary'
              )}
            >
            </Typography> */}
            {formatMessage(message)}
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
