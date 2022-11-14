import { ReactElement } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'

import { Route } from 'router/routes'
import { sidebarMessages } from 'messages'

interface Props {
  routeModule: Route
  pathname: string
  isSubmodule?: boolean
}

const LinkButton = ({
  routeModule,
  pathname,
  isSubmodule
}: Props): ReactElement => {
  const history = useHistory()
  const intl = useIntl()

  return (
    <button
      key={routeModule.id}
      className={clsx(
        'text-sm font-medium rounded-md w-full',
        pathname === routeModule.path ||
          (!isSubmodule &&
            routeModule.modules.some(
              (subModule) => subModule.path === pathname
            ))
          ? 'bg-blue-800 text-white'
          : 'text-white hover:bg-blue-600 hover:bg-opacity-75'
      )}
      onClick={() => history.push(routeModule.path)}
    >
      <div className="w-full h-full flex">
        {isSubmodule ? (
          <div
            className={clsx(
              'h-10 w-1',
              routeModule.path === pathname && 'bg-blue-200'
            )}
          />
        ) : null}
        <div
          className={clsx(
            'px-2 py-2 flex items-center',
            isSubmodule && 'pl-9 ml-1.5'
          )}
        >
          {!isSubmodule && routeModule.icon ? (
            <routeModule.icon
              className="mr-3 flex-shrink-0 h-6 w-6 text-blue-300"
              aria-hidden="true"
            />
          ) : null}
          {routeModule.i18Key
            ? intl.formatMessage(sidebarMessages[routeModule.i18Key])
            : ''}
        </div>
      </div>
    </button>
  )
}

export default LinkButton
