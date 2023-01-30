import { ReactElement } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'

import { Route } from 'router/routes'
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
  return (
    <button
      key={routeModule.id}
      className={clsx(
        'text-sm font-medium rounded-md w-full relative before:absolute before:top-0 before:bottom-0 before:left-0 before:opacity-10 before:transition-all before:duration-500 before:rounded-md before:bg-black before:w-0 group',
        pathname === routeModule.path ||
          routeModule.modules.some((subModule) => subModule.path === pathname)
          ? 'before:w-full border-r-2 border-sky-500'
          : 'hover:before:w-full'
      )}
      onClick={() => history.push(routeModule.path)}
    >
      <div
        className={clsx('w-full h-full flex break whitespace-nowrap relative')}
      >
        <div className={'px-2 py-2 flex items-center'}>
          {routeModule.icon ? (
            <routeModule.icon
              className={clsx(
                'mr-3 flex-shrink-0 h-6 w-6 text-slate-700 transition-all duration-500',
                !expanded && 'scale-150 translate-x-5'
              )}
              aria-hidden="true"
            />
          ) : null}
          <span
            className={clsx(
              !expanded && 'opacity-0 ',
              'transition-opacity duration-500'
            )}
          >
            {routeModule.i18Key
              ? intl.formatMessage(sidebarMessages[routeModule.i18Key])
              : ''}
          </span>
        </div>
        {!expanded && (
          <div className="absolute transition-all duration-500 ease-in left-full top-2 ml-1 max-w-0 overflow-hidden group-hover:max-w-xl bg-gray-200 rounded">
            <span className="px-2">
              {routeModule.i18Key
                ? intl.formatMessage(sidebarMessages[routeModule.i18Key])
                : ''}
            </span>
          </div>
        )}
      </div>
    </button>
  )
}

export default LinkButton
