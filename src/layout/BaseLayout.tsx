/* This example requires Tailwind CSS v2.0+ */
import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

import VoiceprintLogo from 'assets/Icons/VoiceprintLogo'
import { routes } from 'router/routes'
import { Layout } from 'types/layout'
import Loader from 'components/Loader'
import Item from './components/Item'
import SelectLocale from 'components/SelectLocale'
import UserInfo from './components/UserInfo'

const BaseLayout = ({ children }: Layout): ReactElement => {
  const { pathname } = useLocation()

  return (
    <>
      <div>
        <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
          <div className='flex-1 flex flex-col min-h-0 bg-blue-700'>
            <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
              <div className='flex items-center flex-shrink-0 px-4'>
                <VoiceprintLogo />
              </div>
              <nav className='mt-5 flex-1 px-2 space-y-1'>
                {routes
                  .filter(route => route.sidebar)
                  .map(route => (
                    <Item key={route.id} route={route} pathname={pathname} />
                  ))}
              </nav>
            </div>
            <div className='flex-shrink-0 flex-column border-t border-blue-800 p-4'>
              <SelectLocale className='mb-3 bg-blue-600 text-white' />
              <UserInfo />
            </div>
          </div>
        </div>
        <div className='md:pl-64 flex flex-col flex-1'>
          <div className='sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100'></div>
          <main className='flex-1'>
            <div className='py-6'>
              <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
                <div className='py-4'>
                  <div className=' border-gray-200 rounded-lg'>{children}</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Loader />
    </>
  )
}

export default BaseLayout
