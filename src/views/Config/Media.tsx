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
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import WrongPermissions from 'components/WrongPermissions'

const MediaComponent = (): ReactElement => {
  const { formatMessage } = useIntl()
  const ability = useAbility()
  const types = {
    media: mediaMessages.mediaTab,
    carrier: mediaMessages.carrierTab,
    device: mediaMessages.deviceTab
  }
  const [active, setActive, Content] = useTabs<'media' | 'carrier' | 'device'>(
    ability.can(ACTION.READ, SUBJECT.ACQUISITION_MEDIUMS)
      ? 'media'
      : ability.can(ACTION.READ, SUBJECT.CARRIERS)
      ? 'carrier'
      : ability.can(ACTION.READ, SUBJECT.DEVICES)
      ? 'device'
      : 'media'
  )

  return (
    <div>
      <NavOptions />
      <div className="mt-2">
        {Object.entries(types).map(([tab, message], index) => {
          if (
            (tab === 'media' &&
              ability.cannot(ACTION.READ, SUBJECT.ACQUISITION_MEDIUMS)) ||
            (tab === 'carrier' &&
              ability.cannot(ACTION.READ, SUBJECT.CARRIERS)) ||
            (tab === 'device' && ability.cannot(ACTION.READ, SUBJECT.DEVICES))
          ) {
            return null
          }

          return (
            <button
              key={index}
              className={clsx(
                'text-secondary-gray mr-5 font-medium px-2 py-1 rounded-md hover:bg-[#F4F9FF] hover:text-primary',
                active === tab && 'bg-[#F4F9FF] !text-primary'
              )}
              onClick={() => setActive(tab)}
            >
              {formatMessage(message)}
            </button>
          )
        })}
      </div>

      <Content value="media">
        {ability.can(ACTION.READ, SUBJECT.ACQUISITION_MEDIUMS) ? (
          <MediaTab />
        ) : (
          <WrongPermissions />
        )}
      </Content>
      <Content value="carrier">
        {ability.can(ACTION.READ, SUBJECT.CARRIERS) ? (
          <CarrierTab />
        ) : (
          <WrongPermissions />
        )}
      </Content>
      <Content value="device">
        {ability.can(ACTION.READ, SUBJECT.DEVICES) ? (
          <DeviceTab />
        ) : (
          <WrongPermissions />
        )}
      </Content>
    </div>
  )
}

export default MediaComponent
