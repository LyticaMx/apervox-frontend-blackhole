import { ReactElement } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'

import { Route } from 'router/routes'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Tooltip from 'components/Tooltip'
import { sidebarMessages } from 'globalMessages'

interface Props {
  routeModule: Route
  pathname: string
  expanded?: boolean
}

const LinkButton = ({
  routeModule,
  pathname,
  expanded
}: Props): ReactElement => {
  const history = useHistory()
  const intl = useIntl()

  const isCurrent = pathname === routeModule.path

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
      <button
        className={clsx(
          'p-1 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100',
          {
            'bg-gray-100 text-primary': isCurrent,
            'text-gray-700': !isCurrent
          }
        )}
        onClick={() => history.push(routeModule.path)}
      >
        {routeModule.icon ? (
          <routeModule.icon className="h-5 w-5 m-auto" />
        ) : (
          <QuestionMarkCircleIcon className="h-5 w-5 m-auto" />
        )}
      </button>
    </Tooltip>
  )
}

export default LinkButton
