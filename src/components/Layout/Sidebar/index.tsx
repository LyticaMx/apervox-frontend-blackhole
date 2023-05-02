import { ReactElement } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { routes } from 'router/routes'
import Item from './components/Item'
import { SignalIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useSidebar } from 'context/Sidebar'
import Tooltip from 'components/Tooltip'
import { useIntl } from 'react-intl'
import { sidebarMessages } from 'globalMessages'

const Sidebar = (): ReactElement => {
  const { pathname } = useLocation()
  const { open } = useSidebar()
  const { formatMessage } = useIntl()
  const history = useHistory()

  return (
    <aside
      className={clsx(
        'flex flex-col items-center md:w-14 h-screen py-8 bg-white border-r rtl:border-l rtl:border-r-0 rounded-r-2xl',
        'absolute inset-y-0 left-0 z-20',
        'shadow-lg'
      )}
    >
      <nav className="flex flex-col flex-1 space-y-2 items-center">
        <Tooltip
          content={formatMessage(sidebarMessages.myAccount)}
          floatProps={{ offset: 10, arrow: true }}
          classNames={{
            panel:
              'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
            arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
          }}
          placement="right"
        >
          <a
            onClick={() => history.push('/mi-cuenta')}
            className="p-1 text-white focus:outline-nones transition-colors duration-200 rounded-lg bg-primary cursor-pointer block hover:bg-primary-600"
          >
            <UserCircleIcon className="h-5 w-5" />
          </a>
        </Tooltip>

        {routes
          .filter((route) => route.sidebar)
          .map((route) => (
            <Item
              key={route.id}
              route={route}
              pathname={pathname}
              expanded={open}
            />
          ))}
      </nav>

      <div className="flex flex-col space-y-6">
        <a
          href="#"
          className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg   hover:bg-gray-100"
        >
          <SignalIcon className="w-6 h-6 text-red-500" />
        </a>
      </div>
    </aside>
  )
}

export default Sidebar
