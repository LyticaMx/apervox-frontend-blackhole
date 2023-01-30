import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import VoiceprintLogo from 'assets/Icons/VoiceprintLogo'
import { routes } from 'router/routes'
import Item from './components/Item'
import SelectLocale from 'components/SelectLocale'
import UserInfo from './components/UserInfo'
import { ReactComponent as Isotipo } from 'assets/SVG/Isotipo.svg'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useSidebar } from 'context/Sidebar'
import clsx from 'clsx'

const Sidebar = (): ReactElement => {
  const { pathname } = useLocation()
  const { open: expanded, actions } = useSidebar()

  return (
    <div
      className={clsx(
        'hidden md:flex md:flex-col transition-all sticky top-0 duration-500 max-h-screen',
        expanded ? 'md:w-64' : 'md:w-24'
      )}
    >
      <div className="flex-1 flex flex-col min-h-0 bg-slate-100">
        <div className="flex-1 flex flex-col pt-5 pb-4">
          <div
            className={clsx(
              'inline-flex items-center transition-all duration-500',
              expanded ? 'px-4' : 'px-2'
            )}
          >
            <Isotipo
              className={clsx(
                'w-14 transition-all shrink-0 duration-500',
                expanded ? 'mr-4' : 'scale-125 translate-x-5'
              )}
            />
            <VoiceprintLogo
              className={clsx(
                'transition-opacity duration-200',
                expanded ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>
          <div className="px-4 mt-4">
            <hr className="text-slate-300 px-4" />
          </div>
          <div className="my-6 relative">
            <button
              className="rounded-full bg-sky-500 w-8 h-8 p-1 text-white absolute -right-4 -top-4"
              onClick={() => actions?.toggleSidebar()}
            >
              <ChevronLeftIcon
                className={clsx(
                  !expanded && 'rotate-180',
                  'transition-transform duration-500'
                )}
              />
            </button>
          </div>
          <nav
            className={clsx(
              'flex-1 px-2 space-y-1 overflow-x-visible',
              expanded && 'overflow-y-auto max-h-[65vh] sidebar-scroll'
            )}
            onMouseLeave={() => actions?.setOpen(false)}
          >
            {routes
              .filter((route) => route.sidebar)
              .map((route) => (
                <Item
                  key={route.id}
                  route={route}
                  pathname={pathname}
                  expanded={expanded}
                />
              ))}
          </nav>
        </div>
        <div className="px-4 mt-2">
          <hr className="text-slate-300 px-4" />
        </div>
        <div className="flex-shrink-0 flex-column  p-4">
          <SelectLocale
            className={clsx(
              'mb-3 !w-full transition-colors',
              expanded && 'bg-gray-300'
            )}
            expanded={expanded}
          />
          <UserInfo expanded={expanded} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
