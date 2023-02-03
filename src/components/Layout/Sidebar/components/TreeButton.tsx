import { ReactElement } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'

import { Route } from 'router/routes'
import { sidebarMessages } from 'globalMessages'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
// import { useSidebar } from 'context/Sidebar'

interface Props {
  routeModule: Route
  pathname: string
  expanded?: boolean
}

const TreeButton = ({
  routeModule,
  pathname,
  expanded
}: Props): ReactElement => {
  const history = useHistory()
  const intl = useIntl()
  // const { actions } = useSidebar()
  return (
    <button
      key={routeModule.id}
      className={clsx(
        'text-sm font-medium transition-all duration-500 rounded-md relative first:overflow-hidden hover:before:w-full',
        expanded ? 'w-full' : 'w-48'
      )}
      onClick={() => {
        // actions?.setOpen(false)
        history.push(routeModule.path)
      }}
    >
      <div className="w-full h-full flex break whitespace-nowrap">
        <div
          className={clsx(
            'px-2 py-2 pl-9 ml-1.5 relative before:absolute before:-top-[20px] before:left-[11px] before:w-[20px] before:h-full before:border-l before:border-b before:border-sky-500 w-full before:rounded-bl-md'
          )}
        >
          <div
            className={clsx(
              'transition-opacity duration-500 relative before:absolute before:top-0 before:bottom-0 before:left-0 before:opacity-10 before:transition-all before:duration-500 before:rounded-md before:bg-black text-left px-2 flex justify-between items-center overflow-hidden',
              routeModule.path === pathname
                ? 'before:w-full'
                : 'before:w-0 hover:before:w-full'
            )}
          >
            <span>
              {routeModule.i18Key
                ? intl.formatMessage(sidebarMessages[routeModule.i18Key])
                : ''}
            </span>
            <ChevronLeftIcon
              className={clsx(
                'inline h-3 w-3 absolute transition-all  text-slate-800',
                routeModule.path === pathname ? 'right-1' : '-right-8'
              )}
            />
          </div>
        </div>
      </div>
    </button>
  )
}

export default TreeButton
