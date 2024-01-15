import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { useIntl } from 'react-intl'

import { Route } from 'router/routes'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Tooltip from 'components/Tooltip'
import { sidebarMessages } from 'globalMessages'

interface Props {
  routeModule: Route
}

const LinkButton = ({ routeModule }: Props): ReactElement => {
  const intl = useIntl()

  return (
    <Tooltip
      content={
        routeModule.i18Key
          ? intl.formatMessage(sidebarMessages[routeModule.i18Key])
          : ''
      }
      floatProps={{ offset: 10, arrow: true }}
      classNames={{
        panel:
          'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
        arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
      }}
      placement="right"
    >
      <NavLink
        to={routeModule.path}
        className="block p-1 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100 text-gray-700"
        activeClassName="!bg-gray-100 !text-primary"
      >
        {routeModule.icon ? (
          <routeModule.icon className="h-5 w-5 m-auto" />
        ) : (
          <QuestionMarkCircleIcon className="h-5 w-5 m-auto" />
        )}
      </NavLink>
    </Tooltip>
  )
}

export default LinkButton
