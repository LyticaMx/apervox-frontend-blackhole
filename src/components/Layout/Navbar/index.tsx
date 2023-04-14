import { ReactElement, useMemo } from 'react'

import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import Notifications from '../Notifications'
import logo from 'assets/Images/logo_horizontal.svg'
import { useAuth } from 'context/Auth'
import WindowControl from '../WindowControl'
import { NavLink } from 'react-router-dom'
import { pathRoute } from 'router/routes'

const Navbar = (): ReactElement => {
  const { auth, actions } = useAuth()
  const fullName = useMemo(
    () => `${String(auth.profile.names)} ${String(auth.profile.lastName)}`,
    [auth.profile]
  )

  const handleClick = async (): Promise<void> => {
    await actions?.signOut()
    actions?.killSession(true)
  }

  return (
    <nav className="relativ shadow bg-secondary z-10 h-11">
      <div className="pl-20 px-4 mx-auto h-full">
        <div className="lg:flex sm:items-center lg:justify-between h-full ">
          <div className="flex items-center justify-between">
            <img
              className="w-auto h-4 sm:h-5"
              src={logo}
              alt="blackhole-logo"
            />
          </div>

          <div className="absolute inset-x-0 z-20 w-full h-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-secondary lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
            <div className="flex items-center mt-4 lg:mt-0 h-full">
              <span className="text-white text-sm font-light">{fullName}</span>
              <Notifications />
              <NavLink
                to={pathRoute.config.general}
                className="mx-2 text-gray-200 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none !h-full px-1 flex items-center justify-center"
                activeClassName="!text-primary-600 bg-white bg-opacity-10"
              >
                <Cog6ToothIcon className="w-5 h-5 " />
              </NavLink>
              <button
                onClick={handleClick}
                className="hidden mx-2 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4 text-white" />
              </button>
              <WindowControl />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
