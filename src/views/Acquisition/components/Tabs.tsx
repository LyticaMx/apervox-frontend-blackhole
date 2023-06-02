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
          name: getMessage('acquisitionMedium'),
          to: pathRoute.acquisition.acquisitionMedium
        },
        {
          name: getMessage('verificationLine'),
          to: pathRoute.acquisition.verificationLine
        }
      ]}
    />
  )
}

export default Tabs
