import NavTabs from 'components/NavTabs'
import { useFormatMessage } from 'hooks/useIntl'
import { ReactElement } from 'react'
import { pathRoute } from 'router/routes'
import { tabsMessages } from '../messages'

const Tabs = (): ReactElement => {
  const getMessage = useFormatMessage(tabsMessages)

  return (
    <NavTabs
      tabs={[
        {
          name: getMessage('monitoring'),
          to: pathRoute.monitoring.base
        },
        {
          name: getMessage('history'),
          to: pathRoute.monitoring.history
        }
      ]}
    />
  )
}

export default Tabs
