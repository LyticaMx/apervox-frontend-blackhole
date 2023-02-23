import NavTabs from 'components/NavTabs'
import { generalMessages } from 'globalMessages'
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
          name: formatMessage(generalMessages.main)
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
