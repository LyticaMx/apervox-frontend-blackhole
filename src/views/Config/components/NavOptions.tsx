import NavTabs from 'components/NavTabs'
import { platformMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { pathRoute } from 'router/routes'
import { messages } from '../messages'

const NavOptions = (): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <NavTabs
      tabs={[
        {
          to: pathRoute.config.general,
          name: formatMessage(platformMessages.main)
        },
        {
          to: pathRoute.config.media,
          name: formatMessage(messages.mediaAndDevices)
        },
        {
          to: pathRoute.config.telecom,
          name: formatMessage(messages.telecomStations)
        }
      ]}
    />
  )
}

export default NavOptions
